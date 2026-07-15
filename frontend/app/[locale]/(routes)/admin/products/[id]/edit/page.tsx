import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getProductById } from "@/lib/products";
import { EditProductForm } from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
};

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const product = getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">
          {dictionary.common.productManagement?.edit || "Edit Product"}
        </h1>
      </div>

      <EditProductForm
        locale={locale}
        dictionary={dictionary}
        product={product}
      />
    </div>
  );
}
