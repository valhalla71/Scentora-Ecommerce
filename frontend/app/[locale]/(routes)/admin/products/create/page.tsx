import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { CreateProductForm } from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CreateProductPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">
          {dictionary.common.productManagement?.create || "Create Product"}
        </h1>
      </div>

      <CreateProductForm locale={locale} dictionary={dictionary} />
    </div>
  );
}
