import type { LocaleParamsPromise } from "@/i18n/types";
import { isValidLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/layout/container";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system/tokens";

export default async function AboutPage(props: LocaleParamsPromise) {
  const params = await props.params;
  const rawLocale = params.locale;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);
  const { about } = dictionary.common;

  const teamMembers = [
    {
      name: "Sophie Laurent",
      role: "Founder & Perfumer",
      description: "Master perfumer with 25+ years of experience in luxury fragrances.",
    },
    {
      name: "Marcus Chen",
      role: "Head of Operations",
      description: "Expert in supply chain and quality assurance across 50+ countries.",
    },
    {
      name: "Amara Okonkwo",
      role: "Customer Experience Director",
      description: "Dedicated to creating exceptional experiences for every customer.",
    },
    {
      name: "David Rossi",
      role: "Chief Creative Officer",
      description: "Innovation leader shaping the future of perfume collections.",
    },
  ];

  const values = [
    {
      title: about.quality,
      description:
        "We source only the finest ingredients and craft each fragrance with meticulous attention to detail.",
    },
    {
      title: about.authenticity,
      description:
        "Every scent tells a story. We celebrate individuality and authentic self-expression.",
    },
    {
      title: about.service,
      description:
        "Your satisfaction is our priority. We stand behind every product with exceptional support.",
    },
  ];

  return (
    <main>
      <section style={{ paddingBlock: spacing.section.lg }} className="border-b border-border/40">
        <Container>
          <div className="max-w-3xl">
            <h1 className={cn(textVariants({ variant: "h1" }), "mb-4 text-balance")}>
              {about.title}
            </h1>
            <p className={cn(textVariants({ variant: "body" }), "text-lg text-muted-foreground")}>
              Since 1995, Scentora has been crafting luxury fragrances that capture moments, emotions,
              and the essence of elegance. Our mission is to bring the world's finest perfumes to
              people who appreciate quality and artistry.
            </p>
          </div>
        </Container>
      </section>

      <section style={{ paddingBlock: spacing.section.lg }}>
        <Container>
          <div className="mb-12">
            <h2 className={cn(textVariants({ variant: "h2" }), "mb-6 text-center")}>
              {about.mission}
            </h2>
            <div className="mx-auto max-w-2xl">
              <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
                Our mission is to celebrate the art of perfumery by offering carefully curated
                fragrances that inspire confidence, joy, and connection. We believe everyone deserves
                access to luxury scents that make them feel extraordinary.
              </p>
            </div>
          </div>

          <div>
            <h2 className={cn(textVariants({ variant: "h2" }), "mb-8 text-center")}>
              {about.values}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {values.map((value) => (
                <article key={value.title} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                  <h3 className={cn(textVariants({ variant: "h4" }), "mb-2")}>
                    {value.title}
                  </h3>
                  <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section style={{ paddingBlock: spacing.section.lg }} className="border-t border-border/40 bg-muted/30">
        <Container>
          <h2 className={cn(textVariants({ variant: "h2" }), "mb-12 text-center")}>
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-lg border border-border/40 p-6 text-center">
                <div className="mb-4 aspect-square rounded-lg bg-muted" />
                <h3 className={cn(textVariants({ variant: "h4" }))}>{member.name}</h3>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-primary font-medium mb-2")}>
                  {member.role}
                </p>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  {member.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ paddingBlock: spacing.section.lg }}>
        <Container size="narrow">
          <div className="rounded-lg border border-border/40 bg-card p-8 text-center sm:p-12">
            <h2 className={cn(textVariants({ variant: "h2" }), "mb-4")}>
              Why Choose Scentora?
            </h2>
            <p className={cn(textVariants({ variant: "body" }), "mb-6 text-muted-foreground")}>
              We're not just selling perfumes. We're curating experiences, supporting artisans, and
              helping you express your unique story through scent. Join thousands of satisfied
              customers who trust Scentora for their fragrance needs.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl">🌍</div>
                <h3 className={cn(textVariants({ variant: "h4" }), "mb-1")}>Global Selection</h3>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  Fragrances from the world's finest makers
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">🔒</div>
                <h3 className={cn(textVariants({ variant: "h4" }), "mb-1")}>100% Authentic</h3>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  Guaranteed original products
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">💝</div>
                <h3 className={cn(textVariants({ variant: "h4" }), "mb-1")}>Expert Support</h3>
                <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  Personalized fragrance guidance
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
