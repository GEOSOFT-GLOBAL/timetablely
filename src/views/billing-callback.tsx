import * as React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IconCheck, IconCoins, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useCreditsStore } from "@/store/creditsStore";

/**
 * Where Paystack sends the user back to.
 *
 * The redirect itself proves nothing — anyone can visit this URL with any
 * reference — so the page asks the server to confirm the payment rather than
 * believing the query string. The webhook may well have settled it first; a
 * confirmed-but-already-credited answer is a success, not a duplicate.
 */
const BillingCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const confirmPayment = useCreditsStore((state) => state.confirmPayment);
  const error = useCreditsStore((state) => state.error);

  const reference = params.get("reference") || params.get("trxref");

  const [status, setStatus] = React.useState<"checking" | "done" | "failed">(
    reference ? "checking" : "failed"
  );
  const [credits, setCredits] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!reference) return;

    let cancelled = false;

    void (async () => {
      const result = await confirmPayment(reference);
      if (cancelled) return;

      if (result) {
        setCredits(result.credits);
        setStatus("done");
      } else {
        setStatus("failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference, confirmPayment]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        {status === "checking" && (
          <>
            <CardHeader className="items-center text-center">
              <Spinner className="h-8 w-8" />
              <CardTitle className="mt-4">Confirming your payment</CardTitle>
              <CardDescription>
                This only takes a moment. Please don't close the page.
              </CardDescription>
            </CardHeader>
          </>
        )}

        {status === "done" && (
          <>
            <CardHeader className="items-center text-center">
              <div className="rounded-full bg-green-600/10 p-3 text-green-600">
                <IconCheck className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">Payment confirmed</CardTitle>
              <CardDescription>
                {credits !== null
                  ? `${credits.toLocaleString()} credits are on your balance.`
                  : "Your credits are on your balance."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button onClick={() => navigate("/app/billing")}>
                <IconCoins className="h-4 w-4" />
                Back to billing
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/app/schedule">Go to my schedule</Link>
              </Button>
            </CardContent>
          </>
        )}

        {status === "failed" && (
          <>
            <CardHeader className="items-center text-center">
              <div className="bg-destructive/10 text-destructive rounded-full p-3">
                <IconX className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">
                {reference
                  ? "We could not confirm that payment"
                  : "No payment to confirm"}
              </CardTitle>
              <CardDescription>
                {error ||
                  (reference
                    ? "If you were charged, the credits will still arrive once the payment settles. Your billing history will show it."
                    : "This page is where Paystack returns you after a purchase.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/app/billing")}
              >
                Back to billing
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default BillingCallback;
