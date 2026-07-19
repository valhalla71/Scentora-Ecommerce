import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { CartContent } from "./cart-content";

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: CartPageProps) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const labels = dictionary.common.cart;

  return (
    <main style={{ paddingBlock: spacing.section.lg }}>
      <Container>
        <div className="mb-8">
          <h1 className={cn(textVariants({ variant: "h1" }), "text-balance")}>
            {labels.title}
          </h1>
        </div>
        <CartContent labels={labels} />
      </Container>
    </main>
  );
}
