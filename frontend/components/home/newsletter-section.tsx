"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

interface NewsletterSectionProps {
  title: string;
  description: string;
  placeholder: string;
  subscribeLabel: string;
  successMessage: string;
}

export function NewsletterSection({
  title,
  description,
  placeholder,
  subscribeLabel,
  successMessage,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitted(true);
    setEmail("");
    setIsLoading(false);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      className="border-t border-border/40 bg-muted/50 py-12 sm:py-16"
      aria-labelledby="newsletter-heading"
    >
      <Container size="narrow">
        <div className="text-center">
          <h2
            id="newsletter-heading"
            className={cn(textVariants({ variant: "h3" }), "mb-2")}
          >
            {title}
          </h2>
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-6")}>
            {description}
          </p>

          {isSubmitted ? (
            <div className="rounded-lg bg-green-50 p-4 text-green-700">
              <p className={textVariants({ variant: "body" })}>{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : subscribeLabel}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
