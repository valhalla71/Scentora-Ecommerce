import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Management",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {dictionary.common.productManagement?.title || "Product Management"}
          </h1>
        </div>
        <Link href={`/${locale}/admin/products/create`}>
          <Button>
            {dictionary.common.productManagement?.create || "Create Product"}
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder={
            dictionary.common.productManagement?.search || "Search products..."
          }
          className="w-full px-3 py-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                ID
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.productManagement?.name || "Name"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.productManagement?.category || "Category"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.productManagement?.price || "Price"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                Rating
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{product.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{product.name}</td>
                <td className="px-4 py-3 text-sm text-foreground">{product.category}</td>
                <td className="px-4 py-3 text-sm text-foreground">{product.price}</td>
                <td className="px-4 py-3 text-sm text-foreground">⭐ {product.rating}</td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <Link href={`/${locale}/admin/products/${product.id}/edit`}>
                    <Button variant="outline" size="xs">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="destructive" size="xs">
                    Delete
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
