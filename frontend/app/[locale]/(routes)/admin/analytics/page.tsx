import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import {
  mockMetrics,
  mockTopProducts,
  mockSalesData,
} from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AnalyticsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {dictionary.common.analytics?.title || "Analytics"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">Last 7 Days</Button>
          <Button variant="outline">Last 30 Days</Button>
          <Button>Last 90 Days</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label={dictionary.common.metrics?.revenue || "Revenue"}
          value={mockMetrics.revenue}
        />
        <MetricCard
          label={dictionary.common.metrics?.totalOrders || "Total Orders"}
          value={mockMetrics.totalOrders}
        />
        <MetricCard
          label={dictionary.common.metrics?.averageOrderValue || "Avg Order Value"}
          value={mockMetrics.averageOrderValue}
        />
        <MetricCard
          label={dictionary.common.metrics?.conversionRate || "Conversion Rate"}
          value={mockMetrics.conversionRate}
        />
      </div>

      <div className="bg-background border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
        <div className="h-64 flex items-end justify-between gap-2 bg-muted/20 p-4 rounded">
          {mockSalesData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 gap-2">
              <div
                className="w-full bg-primary rounded-t"
                style={{
                  height: `${(data.sales / 2500) * 200}px`,
                  minHeight: "4px",
                }}
              />
              <span className="text-xs text-muted-foreground">{data.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {dictionary.common.analytics?.topProducts || "Top Products"}
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                    Product
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                    Sales
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockTopProducts.map((product) => (
                  <tr key={product.productId} className="hover:bg-muted transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{product.productName}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{product.sales}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{product.revenue}</td>
                    <td className="px-4 py-3 text-sm text-foreground">⭐ {product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {dictionary.common.analytics?.customerInsights || "Customer Insights"}
          </h2>
          <div className="space-y-3 bg-background border border-border rounded-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Customers</span>
              <span className="font-bold">1,250</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">New Customers</span>
              <span className="font-bold">145</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Repeat Customers</span>
              <span className="font-bold">312</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Customer LTV</span>
              <span className="font-bold">$245.80</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
