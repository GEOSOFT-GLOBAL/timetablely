import { create } from "zustand";

import {
  CreditsError,
  InsufficientCreditsError,
  creditsApi,
  type CreditBalance,
  type CreditFeature,
  type CreditTransaction,
  type CreditsCatalog,
} from "@/lib/credits-api";
import { useAuthStore } from "./authStore";
import { useWorkspaceStore } from "./workspaceStore";

/**
 * Credits: a prepaid balance spent on AI scheduling and PDF exports.
 *
 * Nothing is persisted. A balance cached across reloads would be a balance
 * that disagrees with the server the moment a colleague spends from the same
 * pool, and the server is the only copy that decides anything.
 */

/**
 * Server ids are ObjectIds. A workspace created before the workspace server
 * existed has a local `ws-…` id that would only produce a 400, so those fall
 * back to the user's own balance rather than breaking the billing page.
 */
const isServerId = (value: string | null | undefined): value is string =>
  typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);

/** The pool in play: the active workspace's, or the signed-in user's. */
export const activeCreditScope = (): string | null => {
  const { activeWorkspaceId } = useWorkspaceStore.getState();
  return isServerId(activeWorkspaceId) ? activeWorkspaceId : null;
};

interface CreditsState {
  catalog: CreditsCatalog | null;
  account: CreditBalance | null;
  transactions: CreditTransaction[];
  isLoading: boolean;
  isCheckingOut: boolean;
  error: string | null;

  loadCatalog: () => Promise<void>;
  refresh: () => Promise<void>;
  loadHistory: () => Promise<void>;
  /** Charges for one use, returning the id needed to reverse it. */
  charge: (
    feature: CreditFeature,
    quantity?: number
  ) => Promise<{ transactionId: string }>;
  /** Reverses a charge whose work then failed. */
  reverse: (transactionId: string, reason?: string) => Promise<void>;
  /** Opens Paystack for a credit pack. Resolves to the URL to send the user to. */
  buyPack: (packId: string) => Promise<string | null>;
  /** Opens Paystack for a plan, which also carries that plan's credits. */
  buyPlan: (planId: string) => Promise<string | null>;
  confirmPayment: (
    reference: string
  ) => Promise<{ credited: boolean; credits: number } | null>;
  clearError: () => void;
}

const messageFor = (error: unknown, fallback: string) =>
  error instanceof CreditsError || error instanceof Error
    ? error.message || fallback
    : fallback;

export const useCreditsStore = create<CreditsState>((set, get) => ({
  catalog: null,
  account: null,
  transactions: [],
  isLoading: false,
  isCheckingOut: false,
  error: null,

  loadCatalog: async () => {
    if (get().catalog) return;
    try {
      set({ catalog: await creditsApi.catalog() });
    } catch (error) {
      set({ error: messageFor(error, "Could not load the credits catalog.") });
    }
  },

  refresh: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    try {
      set({ account: await creditsApi.balance(token, activeCreditScope()) });
    } catch (error) {
      set({ error: messageFor(error, "Could not load your credit balance.") });
    }
  },

  loadHistory: async () => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const { transactions, ...account } = await creditsApi.transactions(
        token,
        activeCreditScope()
      );
      set({ account, transactions, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: messageFor(error, "Could not load your credit history."),
      });
    }
  },

  charge: async (feature, quantity = 1) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw new CreditsError("Sign in to use this feature.");
    }

    const result = await creditsApi.spend(token, feature, {
      quantity,
      workspaceId: activeCreditScope(),
    });

    // The charge already happened server-side; reflect it without a round trip.
    set((state) => ({
      account: state.account
        ? { ...state.account, balance: result.balance }
        : state.account,
    }));

    return { transactionId: result.transactionId };
  },

  reverse: async (transactionId, reason) => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    await creditsApi.voidCharge(token, transactionId, {
      reason,
      workspaceId: activeCreditScope(),
    });
    await get().refresh();
  },

  buyPack: async (packId) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Sign in to buy credits." });
      return null;
    }

    set({ isCheckingOut: true, error: null });
    try {
      const checkout = await creditsApi.checkoutPack(
        token,
        packId,
        activeCreditScope()
      );
      set({ isCheckingOut: false });
      return checkout.authorizationUrl;
    } catch (error) {
      set({
        isCheckingOut: false,
        error: messageFor(error, "Could not start checkout."),
      });
      return null;
    }
  },

  buyPlan: async (planId) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Sign in to change your plan." });
      return null;
    }

    set({ isCheckingOut: true, error: null });
    try {
      const checkout = await creditsApi.checkoutPlan(
        token,
        planId,
        activeCreditScope()
      );
      set({ isCheckingOut: false });
      return checkout.authorizationUrl;
    } catch (error) {
      set({
        isCheckingOut: false,
        error: messageFor(error, "Could not start checkout."),
      });
      return null;
    }
  },

  confirmPayment: async (reference) => {
    const token = useAuthStore.getState().token;
    if (!token) return null;

    set({ isLoading: true, error: null });
    try {
      const result = await creditsApi.verify(token, reference);
      await get().refresh();
      set({ isLoading: false });
      return { credited: result.credited, credits: result.credits };
    } catch (error) {
      set({
        isLoading: false,
        error: messageFor(error, "Could not confirm that payment."),
      });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));

export { InsufficientCreditsError };
