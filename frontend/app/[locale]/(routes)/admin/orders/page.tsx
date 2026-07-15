import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { mockOrders, formatDate } from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Management",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrdersPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {dictionary.common.orderManagement?.title || "Order Management"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FilterButton label="All Orders" isActive={true} />
        <FilterButton
          label={dictionary.common.orders?.pending || "Pending"}
          isActive={false}
        />
        <FilterButton
          label={dictionary.common.orders?.shipped || "Shipped"}
          isActive={false}
        />
        <FilterButton
          label={dictionary.common.orders?.delivered || "Delivered"}
          isActive={false}
        />
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full px-3 py-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.orderManagement?.orderId || "Order ID"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.orderManagement?.customer || "Customer"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.orderManagement?.date || "Date"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.orderManagement?.status || "Status"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.orderManagement?.total || "Total"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{order.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{order.customerName}</td>
                <td className="px-4 py-3 text-sm text-foreground">{formatDate(order.date)}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{order.total}</td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <Button variant="outline" size="xs">
                    View
                  </Button>
                  {order.status === "pending" && (
                    <Button size="xs">Ship</Button>
                  )}
                  {order.status === "shipped" && (
                    <Button size="xs">Deliver</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterButton({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <Button variant={isActive ? "default" : "outline"} className="w-full">
      {label}
    </Button>
  );
}
