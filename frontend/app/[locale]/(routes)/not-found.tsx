import { Home } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, type Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/navigation";

export default async function NotFound() {
  const locale = defaultLocale as Locale;
  const dictionary = await getDictionary(locale);
  const { title, description, goHome, browseProducts } = dictionary.common.errors.notFound;

  return (
    <main className="flex items-center justify-center min-h-screen py-12">
      <Container className="max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 text-9xl font-bold text-primary/10">
            404
          </div>
          
          <h1 className={cn(textVariants({ variant: "h1" }), "mb-3 text-balance")}>
            {title}
          </h1>
          
          <p className={cn(textVariants({ variant: "body" }), "mb-8 text-muted-foreground")}>
            {description}
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <Link href={localizeHref("/", locale)} className="w-full">
              <Button className="w-full gap-2">
                <Home className="w-4 h-4" />
                {goHome}
              </Button>
            </Link>
            <Link href={localizeHref("/catalog", locale)} className="w-full">
              <Button variant="outline" className="w-full">
                {browseProducts}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
