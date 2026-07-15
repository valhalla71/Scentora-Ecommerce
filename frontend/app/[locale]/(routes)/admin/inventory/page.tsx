import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { mockInventory } from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function InventoryPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {dictionary.common.inventory?.title || "Inventory Management"}
          </h1>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.inventory?.productName || "Product Name"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.inventory?.quantity || "Stock Quantity"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.inventory?.reorderLevel || "Reorder Level"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.inventory?.status || "Status"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockInventory.map((item) => (
              <tr key={item.productId} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{item.productName}</td>
                <td className="px-4 py-3 text-sm text-foreground">{item.stock}</td>
                <td className="px-4 py-3 text-sm text-foreground">{item.reorderLevel}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      item.status === "in-stock"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : item.status === "low-stock"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    }`}
                  >
                    {item.status === "in-stock"
                      ? dictionary.common.inventory?.inStock || "In Stock"
                      : item.status === "low-stock"
                        ? dictionary.common.inventory?.lowStock || "Low Stock"
                        : dictionary.common.inventory?.outOfStock || "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <Button variant="outline" size="xs">
                    Update
                  </Button>
                  <Button variant="outline" size="xs">
                    Reorder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
