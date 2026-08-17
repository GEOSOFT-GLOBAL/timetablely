import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { InsufficientCreditsError, type CreditFeature } from "@/lib/credits-api";
import { useCreditsStore } from "@/store/creditsStore";

/**
 * Running a metered feature: charge, do the work, refund if the work failed.
 *
 * AI scheduling and PDF export both happen in the browser, so the charge has
 * to be taken before the work rather than after it — otherwise the client
 * decides whether to pay. That ordering means a failure after the charge
 * would leave the user short, so this reverses it.
 */

export type MeteredOutcome<T> =
  | { ok: true; result: T }
  | { ok: false; reason: "unaffordable" | "failed"; error?: unknown };

export const useMeteredAction = () => {
  const navigate = useNavigate();
  const charge = useCreditsStore((state) => state.charge);
  const reverse = useCreditsStore((state) => state.reverse);

  return React.useCallback(
    async <T,>(
      feature: CreditFeature,
      run: () => Promise<T> | T,
      options: { quantity?: number; label?: string } = {}
    ): Promise<MeteredOutcome<T>> => {
      let transactionId: string;

      try {
        ({ transactionId } = await charge(feature, options.quantity ?? 1));
      } catch (error) {
        if (error instanceof InsufficientCreditsError) {
          toast.error(error.message, {
            action: {
              label: "Top up",
              onClick: () => navigate("/app/billing"),
            },
          });
          return { ok: false, reason: "unaffordable", error };
        }

        toast.error(
          error instanceof Error
            ? error.message
            : "Could not charge your credits."
        );
        return { ok: false, reason: "failed", error };
      }

      try {
        return { ok: true, result: await run() };
      } catch (error) {
        // The user paid for work that never arrived. Give it back before
        // surfacing the failure.
        await reverse(
          transactionId,
          `Refund — ${options.label ?? "action"} did not complete`
        );
        return { ok: false, reason: "failed", error };
      }
    },
    [charge, reverse, navigate]
  );
};

/** Keeps the balance current for any screen that shows it. */
export const useCreditBalance = () => {
  const account = useCreditsStore((state) => state.account);
  const refresh = useCreditsStore((state) => state.refresh);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  return account;
};
