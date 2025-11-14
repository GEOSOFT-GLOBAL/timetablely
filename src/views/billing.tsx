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
import { IconCreditCard, IconDownload, IconCheck } from "@tabler/icons-react";

const Billing = () => {
  const invoices = [
    { id: "INV-001", date: "Nov 1, 2025", amount: "$29.99", status: "Paid" },
    { id: "INV-002", date: "Oct 1, 2025", amount: "$29.99", status: "Paid" },
    { id: "INV-003", date: "Sep 1, 2025", amount: "$29.99", status: "Paid" },
  ];

  return (
    <div className="md:py-6 py-4 gap-6 px-4 lg:px-6 flex flex-col">
      <div>
        <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your subscription and billing information
        </p>
      </div>

      <Separator />

      {/* Current Plan */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Current Plan</h2>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Pro Plan
                  <Badge variant="default">Active</Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  $29.99 per month • Renews on Dec 1, 2025
                </CardDescription>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 text-green-600" />
                <span>Unlimited courses</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 text-green-600" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 text-green-600" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconCheck className="h-4 w-4 text-green-600" />
                <span>Custom templates</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Payment Method */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Payment Method</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-lg p-3">
                  <IconCreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-muted-foreground text-sm">
                    Expires 12/2026
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Billing History */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Billing History</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {invoice.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      {invoice.status}
                    </Badge>
                    <p className="font-medium min-w-20 text-right">
                      {invoice.amount}
                    </p>
                    <Button variant="ghost" size="sm">
                      <IconDownload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-destructive">Danger Zone</h2>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cancel Subscription</p>
                <p className="text-muted-foreground text-sm">
                  You will lose access to all premium features
                </p>
              </div>
              <Button variant="destructive">Cancel Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;
