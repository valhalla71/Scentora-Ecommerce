import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/catalog/search-bar";
import { ProductFilters } from "@/components/catalog/product-filters";
import { ProductSort } from "@/components/catalog/product-sort";
import { CategoryNav } from "@/components/catalog/category-nav";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import {
  PRODUCT_CATEGORIES,
  filterProducts,
  sortProducts,
  MIN_PRICE,
  MAX_PRICE,
} from "@/lib/catalog";
import { Package } from "lucide-react";
import CatalogContent from "./catalog-content";

type CatalogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const title = locale === "fa"
    ? "فروشگاه عطرها | سنترا"
    : "Shop Premium Perfumes | Scentora";
  
  const description = locale === "fa"
    ? "مرور تمام محصولات عطر و ادکلن ما. ارسال رایگان، قیمتهای رقابتی و کیفیت تضمین شده."
    : "Browse our complete collection of premium perfumes and fragrances. Free shipping, competitive prices, and quality guaranteed.";

  return {
    title,
    description,
    robots: "index, follow",
  };
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { title, description, addToCart } = dictionary.common.catalog;
  const discovery = dictionary.common.discovery;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-12 text-center">
          <h1
            className={cn(
              textVariants({ variant: "h1" }),
              "mb-4 text-balance",
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              textVariants({ variant: "body" }),
              "mx-auto max-w-2xl text-pretty text-muted-foreground",
            )}
          >
            {description}
          </p>
        </div>

        <CatalogContent
          discovery={discovery}
          addToCartLabel={addToCart}
        />
      </Container>
    </main>
  );
}
