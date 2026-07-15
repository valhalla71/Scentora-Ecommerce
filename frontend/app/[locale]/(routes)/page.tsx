import { notFound } from "next/navigation";

import { HeroSection, FeaturesSection, ProductShowcase, TestimonialsSection, CtaSection } from "@/components/home";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

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
