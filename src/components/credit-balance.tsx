import { NavLink } from "react-router-dom";
import { IconCoins } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { useCreditBalance } from "@/hooks/use-credits";

/**
 * The running credit balance, in the header.
 *
 * Metered features fail at the point of use when the balance runs out, so the
 * number has to be visible before that happens — and it doubles as the way to
 * reach the top-up page.
 */
export function CreditBalance() {
  const account = useCreditBalance();

  if (!account) return null;

  const isLow = account.balance < 10;

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="h-9 gap-1.5 px-2"
      title={
        isLow
          ? "Running low on credits — click to top up"
          : "Credit balance — click to manage"
      }
    >
      <NavLink to="/app/billing">
        <IconCoins
          className={`h-4 w-4 ${isLow ? "text-yellow-500" : "text-muted-foreground"}`}
        />
        <span
          className={`text-sm font-medium tabular-nums ${isLow ? "text-yellow-500" : ""}`}
        >
          {account.balance.toLocaleString()}
        </span>
        <span className="sr-only">credits available</span>
      </NavLink>
    </Button>
  );
}

export default CreditBalance;
