import { AxiosError } from "axios";
import { createCreditsClient } from "@/config/axios";

/**
 * Credits transport.
 *
 * Nothing here decides what anything costs. The server owns the catalog and
 * the balance; this file names a pack or a feature and reports what came
 * back. That split is the point — a price the client could choose is not a
 * price.
 */

export type CreditOwnerType = "user" | "workspace";

export type CreditTransactionType =
  | "purchase"
  | "topup"
  | "grant"
  | "spend"
  | "refund"
  | "adjustment";

export type CreditTransactionStatus = "pending" | "applied" | "failed";

export type CreditFeature = "ai_schedule" | "pdf_export";

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  totalCredits: number;
  price: number;
  description: string;
  isPopular?: boolean;
}

export interface CreditsCatalog {
  currency: string;
  publicKey: string | null;
  /** False when the server has no Paystack keys; the UI says so rather than
   * offering a button that cannot work. */
  paymentsEnabled: boolean;
  signupGrant: number;
  packs: CreditPack[];
  featureCosts: Record<CreditFeature, number>;
  featureLabels: Record<CreditFeature, string>;
  planCredits: Record<string, number>;
  planPrices: Record<string, number>;
  purchasablePlans: string[];
}

export interface CreditBalance {
  balance: number;
  lifetimePurchased: number;
  lifetimeSpent: number;
  ownerType: CreditOwnerType;
  ownerId: string;
}

export interface CreditTransaction {
  id: string;
  type: CreditTransactionType;
  status: CreditTransactionStatus;
  amount: number;
  balanceAfter?: number;
  description: string;
  feature?: CreditFeature;
  reference?: string;
  createdAt: string;
  price?: number;
  currency?: string;
}

export interface CheckoutResult {
  authorizationUrl: string;
  reference: string;
  credits: number;
  price: number;
  currency: string;
}

export interface SpendResult {
  balance: number;
  charged: number;
  /** Hand back to `voidCharge` if the work this paid for then fails. */
  transactionId: string;
}

/** Thrown when the balance will not cover the action the user just took. */
export class InsufficientCreditsError extends Error {
  constructor(
    message: string,
    readonly required: number,
    readonly balance: number,
    readonly feature?: CreditFeature
  ) {
    super(message);
    this.name = "InsufficientCreditsError";
  }
}

/** Any credits failure worth showing the user verbatim. */
export class CreditsError extends Error {}

interface ServerError {
  message?: string;
  code?: string;
  errorData?: { required?: number; balance?: number; feature?: CreditFeature };
}

const rethrow = (error: unknown, fallback: string): never => {
  const axiosError = error as AxiosError<ServerError>;
  const payload = axiosError.response?.data;

  if (payload?.code === "INSUFFICIENT_CREDITS") {
    throw new InsufficientCreditsError(
      payload.message || "You do not have enough credits.",
      payload.errorData?.required ?? 0,
      payload.errorData?.balance ?? 0,
      payload.errorData?.feature
    );
  }

  throw new CreditsError(payload?.message || axiosError.message || fallback);
};

/** Only present for a workspace pool; omitted, the user's own balance is used. */
const scope = (workspaceId?: string | null) =>
  workspaceId ? { workspaceId } : {};

export const creditsApi = {
  /** Public — the pricing page reads this before anyone signs in. */
  catalog: async (): Promise<CreditsCatalog> => {
    try {
      const { data } = await createCreditsClient().get("/catalog");
      return data.data as CreditsCatalog;
    } catch (error) {
      return rethrow(error, "Could not load the credits catalog.");
    }
  },

  balance: async (
    token: string,
    workspaceId?: string | null
  ): Promise<CreditBalance> => {
    try {
      const { data } = await createCreditsClient(token).get("/balance", {
        params: scope(workspaceId),
      });
      return data.data as CreditBalance;
    } catch (error) {
      return rethrow(error, "Could not load your credit balance.");
    }
  },

  transactions: async (
    token: string,
    workspaceId?: string | null,
    limit = 50
  ): Promise<CreditBalance & { transactions: CreditTransaction[] }> => {
    try {
      const { data } = await createCreditsClient(token).get("/transactions", {
        params: { ...scope(workspaceId), limit },
      });
      return data.data;
    } catch (error) {
      return rethrow(error, "Could not load your credit history.");
    }
  },

  /** Charges for one use of a metered feature. Throws if the balance is short. */
  spend: async (
    token: string,
    feature: CreditFeature,
    options: { quantity?: number; workspaceId?: string | null } = {}
  ): Promise<SpendResult> => {
    try {
      const { data } = await createCreditsClient(token).post("/spend", {
        feature,
        quantity: options.quantity ?? 1,
        ...scope(options.workspaceId),
      });
      return data.data as SpendResult;
    } catch (error) {
      return rethrow(error, "Could not charge your credits.");
    }
  },

  /** Reverses a charge whose work failed after the credits were taken. */
  voidCharge: async (
    token: string,
    transactionId: string,
    options: { reason?: string; workspaceId?: string | null } = {}
  ): Promise<void> => {
    try {
      await createCreditsClient(token).post("/void", {
        transactionId,
        reason: options.reason,
        ...scope(options.workspaceId),
      });
    } catch (error) {
      // A failed refund must not replace the original error the user is
      // already being shown; the ledger still has the charge either way.
      console.error("[credits] Could not reverse charge:", error);
    }
  },

  checkoutPack: async (
    token: string,
    packId: string,
    workspaceId?: string | null
  ): Promise<CheckoutResult> => {
    try {
      const { data } = await createCreditsClient(token).post("/checkout", {
        kind: "pack",
        packId,
        ...scope(workspaceId),
      });
      return data.data as CheckoutResult;
    } catch (error) {
      return rethrow(error, "Could not start checkout.");
    }
  },

  checkoutPlan: async (
    token: string,
    planId: string,
    workspaceId?: string | null
  ): Promise<CheckoutResult> => {
    try {
      const { data } = await createCreditsClient(token).post("/checkout", {
        kind: "plan",
        planId,
        ...scope(workspaceId),
      });
      return data.data as CheckoutResult;
    } catch (error) {
      return rethrow(error, "Could not start checkout.");
    }
  },

  /**
   * Confirms a payment on return from Paystack. Safe to call more than once —
   * `credited` is false when the webhook already settled it.
   */
  verify: async (
    token: string,
    reference: string
  ): Promise<{ credited: boolean; credits: number; balanceAfter?: number }> => {
    try {
      const { data } = await createCreditsClient(token).get(
        `/verify/${encodeURIComponent(reference)}`
      );
      return data.data;
    } catch (error) {
      return rethrow(error, "Could not confirm that payment.");
    }
  },
};

/** Formats a catalog price for display, e.g. "USD 12" → "$12". */
export const formatMoney = (amount: number, currency: string): string => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
};
