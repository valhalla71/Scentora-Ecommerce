import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { HeroSection, FeaturesSection, ProductShowcase, TestimonialsSection, CtaSection } from "@/components/home";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const title = locale === "fa" 
    ? "سنترا | عطرهای پریمیوم و ادکلن"
    : "Scentora | Premium Perfumes & Fragrances";
  
  const description = locale === "fa"
    ? "مجموعه‌ای منحصر به فرد از عطرهای لوکس و ادکلن‌های برند معروف جهانی"
    : "Discover an exquisite collection of premium perfumes and fragrances from top brands worldwide.";

  return {
    title,
    description,
    keywords: locale === "fa" 
      ? ["عطر", "ادکلن", "عطرهای لوکس", "کلن"]
      : ["perfume", "fragrance", "luxury scents", "cologne"],
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dictionary={dictionary} />
      <FeaturesSection dictionary={dictionary} />
      <ProductShowcase locale={locale} dictionary={dictionary} />
      <TestimonialsSection dictionary={dictionary} />
      <CtaSection locale={locale} dictionary={dictionary} />
    </>
  );
}
