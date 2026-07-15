import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import {
  mockMetrics,
  mockOrders,
  mockUsers,
  getRecentOrders,
  getRecentUsers,
  formatDate,
} from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboardPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const isRTL = locale === "fa";
  const metrics = mockMetrics;
  const recentOrders = getRecentOrders(5);
  const recentUsers = getRecentUsers(5);

  const MetricCard = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="bg-background border border-border rounded-lg p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{dictionary.common.admin?.title || "Dashboard"}</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Scentora admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label={dictionary.common.metrics?.totalSales || "Total Sales"}
          value={metrics.totalSales}
        />
        <MetricCard
          label={dictionary.common.metrics?.totalOrders || "Total Orders"}
          value={metrics.totalOrders}
        />
        <MetricCard
          label={dictionary.common.metrics?.totalUsers || "Total Users"}
          value={metrics.totalUsers}
        />
        <MetricCard
          label={dictionary.common.metrics?.revenue || "Revenue"}
          value={metrics.revenue}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Order ID</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Date</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Total</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{order.customerName}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatDate(order.date)}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{order.total}</td>
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
                    <td className="px-4 py-3 text-sm">
                      <Button variant="outline" size="xs">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Users</h2>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">User ID</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Name</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Email</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">Join Date</th>
                  <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{user.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{formatDate(user.joinDate)}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="outline" size="xs">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Average Metrics</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.common.metrics?.averageOrderValue || "Avg Order Value"}
              </span>
              <span className="font-semibold">{metrics.averageOrderValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dictionary.common.metrics?.conversionRate || "Conversion Rate"}
              </span>
              <span className="font-semibold">{metrics.conversionRate}</span>
            </div>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Button className="w-full justify-start">Create New Product</Button>
            <Button variant="outline" className="w-full justify-start">
              View All Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Inventory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
