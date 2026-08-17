import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconCheck,
  IconCoins,
  IconExternalLink,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";
import { formatMoney, type CreditTransaction } from "@/lib/credits-api";
import { useCreditsStore } from "@/store/creditsStore";
import { useAuthStore } from "@/store/authStore";
import { pricingPlans } from "@/config/pricing";

/**
 * Billing: what the balance is, what it is being spent on, and how to get
 * more of it.
 *
 * Every number on this page comes from the server ledger. Nothing is
 * illustrative — if a row is here, it happened.
 */

const transactionTone: Record<string, string> = {
  purchase: "text-green-600",
  topup: "text-green-600",
  grant: "text-green-600",
  refund: "text-green-600",
  spend: "text-muted-foreground",
  adjustment: "text-muted-foreground",
};

const isCredit = (transaction: CreditTransaction) =>
  transaction.type !== "spend";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const Billing = () => {
  const user = useAuthStore((state) => state.user);
  const {
    catalog,
    account,
    transactions,
    isLoading,
    isCheckingOut,
    error,
    loadCatalog,
    loadHistory,
    buyPack,
    buyPlan,
    clearError,
  } = useCreditsStore();

  const [pendingId, setPendingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    void loadCatalog();
    void loadHistory();
  }, [loadCatalog, loadHistory]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const currency = catalog?.currency ?? "USD";
  const currentPlanId = user?.plan?.toLowerCase() ?? "starter";
  const currentPlan =
    pricingPlans.find((plan) => plan.id === currentPlanId) ?? pricingPlans[0];

  /**
   * Paystack is a hosted page, so checkout is a full navigation rather than a
   * modal. The reservation is already on the server by this point, which is
   * what lets the user come back to /billing/callback and be credited.
   */
  const startCheckout = async (
    id: string,
    open: (id: string) => Promise<string | null>
  ) => {
    setPendingId(id);
    const url = await open(id);
    setPendingId(null);
    if (url) window.location.href = url;
  };

  const isWorkspacePool = account?.ownerType === "workspace";

  return (
    <div className="md:py-6 py-4 gap-6 px-4 lg:px-6 flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold">Billing & Credits</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your balance, what you have spent it on, and how to top up
        </p>
      </div>

      <Separator />

      {/* Balance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Credit balance</h2>
          {isWorkspacePool && (
            <Badge variant="outline" className="gap-1">
              <IconUsers className="h-3 w-3" />
              Shared with your workspace
            </Badge>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-lg p-3">
                  <IconCoins className="h-6 w-6" />
                </div>
                <div>
                  {account ? (
                    <p className="text-3xl font-semibold tabular-nums">
                      {account.balance.toLocaleString()}
                    </p>
                  ) : (
                    <Skeleton className="h-9 w-24" />
                  )}
                  <p className="text-muted-foreground text-sm">
                    credits available
                  </p>
                </div>
              </div>

              <div className="flex gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground">Purchased</p>
                  <p className="font-medium tabular-nums">
                    {account?.lifetimePurchased.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spent</p>
                  <p className="font-medium tabular-nums">
                    {account?.lifetimeSpent.toLocaleString() ?? "—"}
                  </p>
                </div>
              </div>
            </div>

            {catalog && (
              <p className="text-muted-foreground mt-6 text-sm">
                {catalog.featureLabels.ai_schedule} costs{" "}
                <span className="text-foreground font-medium">
                  {catalog.featureCosts.ai_schedule}
                </span>{" "}
                credits · {catalog.featureLabels.pdf_export} costs{" "}
                <span className="text-foreground font-medium">
                  {catalog.featureCosts.pdf_export}
                </span>
                .
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Top up */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">Top up</h2>
          <p className="text-muted-foreground text-sm">
            Credits never expire. Larger packs include bonus credits.
          </p>
        </div>

        {catalog && !catalog.paymentsEnabled && (
          <Card className="border-yellow-600/50">
            <CardContent className="pt-6 text-sm">
              Payments are not configured on this server yet, so top-ups cannot
              be completed. Your balance and history below are live.
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!catalog &&
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-48" />
            ))}

          {catalog?.packs.map((pack) => (
            <Card
              key={pack.id}
              className={pack.isPopular ? "border-primary" : undefined}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{pack.name}</CardTitle>
                  {pack.isPopular && <Badge>Popular</Badge>}
                </div>
                <CardDescription>{pack.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-semibold tabular-nums">
                    {pack.totalCredits.toLocaleString()}
                    <span className="text-muted-foreground ml-1 text-sm font-normal">
                      credits
                    </span>
                  </p>
                  {pack.bonusCredits > 0 && (
                    <p className="text-sm text-green-600">
                      includes {pack.bonusCredits} bonus
                    </p>
                  )}
                </div>
                <Button
                  className="w-full"
                  disabled={
                    isCheckingOut ||
                    !catalog.paymentsEnabled ||
                    pendingId === pack.id
                  }
                  onClick={() => void startCheckout(pack.id, buyPack)}
                >
                  {pendingId === pack.id
                    ? "Opening…"
                    : `Buy for ${formatMoney(pack.price, currency)}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Plan */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Plan</h2>
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {currentPlan.name} plan
                  <Badge variant="default">Active</Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  {currentPlan.monthlyPrice === 0
                    ? "Free"
                    : `${formatMoney(currentPlan.monthlyPrice, currency)} per month`}
                  {catalog?.planCredits[currentPlan.id] !== undefined &&
                    ` · ${catalog.planCredits[currentPlan.id]} credits included`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              {currentPlan.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {catalog && catalog.purchasablePlans.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {catalog.purchasablePlans
                  .filter((planId) => planId !== currentPlan.id)
                  .map((planId) => {
                    const plan = pricingPlans.find(
                      (entry) => entry.id === planId
                    );
                    if (!plan) return null;
                    return (
                      <Button
                        key={planId}
                        variant="outline"
                        disabled={isCheckingOut || !catalog.paymentsEnabled}
                        onClick={() => void startCheckout(planId, buyPlan)}
                      >
                        <IconSparkles className="h-4 w-4" />
                        Switch to {plan.name} —{" "}
                        {formatMoney(catalog.planPrices[planId], currency)}
                        {catalog.planCredits[planId] !== undefined &&
                          ` + ${catalog.planCredits[planId]} credits`}
                      </Button>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* History */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Credit history</h2>
        <Card>
          <CardContent className="p-0">
            {isLoading && transactions.length === 0 ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-12" />
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <p className="text-muted-foreground p-6 text-sm">
                Nothing here yet. Your welcome credits and anything you buy or
                spend will show up here.
              </p>
            ) : (
              <div className="divide-y">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {transaction.description}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(transaction.createdAt)}
                        {transaction.price !== undefined &&
                          ` · ${formatMoney(transaction.price, transaction.currency ?? currency)}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      {transaction.status !== "applied" && (
                        <Badge
                          variant="outline"
                          className={
                            transaction.status === "pending"
                              ? "border-yellow-600 text-yellow-600"
                              : "border-destructive text-destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      )}
                      <p
                        className={`min-w-20 text-right font-medium tabular-nums ${
                          transactionTone[transaction.type] ?? ""
                        }`}
                      >
                        {isCredit(transaction) ? "+" : "−"}
                        {transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <IconExternalLink className="h-3 w-3" />
          Payments are processed by Paystack. Card details never reach this app.
        </p>
      </div>
    </div>
  );
};

export default Billing;
