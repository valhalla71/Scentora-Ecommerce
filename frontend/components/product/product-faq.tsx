import { ChevronDown, ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { ProductFAQ } from "@/lib/products-advanced"

export interface ProductFAQProps {
  faqs: ProductFAQ[];
  dictionary: any;
}

export function ProductFAQ({ faqs, dictionary }: ProductFAQProps) {
  const { product } = dictionary.common;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
        {product.productFAQ}
      </h3>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-lg border border-border/60 bg-card overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
            className="w-full flex items-start justify-between p-4 text-start hover:bg-muted/50 transition-colors"
          >
            <h4 className={cn(textVariants({ variant: "h5" }), "flex-1")}>
              {faq.question}
            </h4>
            <ChevronDown
              className={cn(
                "w-5 h-5 flex-shrink-0 ml-3 transition-transform",
                expanded === faq.id && "rotate-180"
              )}
            />
          </button>

          {expanded === faq.id && (
            <div className="border-t border-border/40 p-4 bg-muted/30">
              <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
                {faq.answer}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  Was this helpful?
                </span>
                <Button variant="ghost" size="icon-xs">
                  <ThumbsUp className="w-3 h-3" />
                  <span className="text-xs ml-1">{faq.helpful}</span>
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <ThumbsDown className="w-3 h-3" />
                  <span className="text-xs ml-1">{faq.notHelpful}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProductFAQClient({ faqs, dictionary }: ProductFAQProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { product } = dictionary.common;

  return (
    <div className="space-y-3">
      <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
        {product.productFAQ}
      </h3>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="rounded-lg border border-border/60 bg-card overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
            className="w-full flex items-start justify-between p-4 text-start hover:bg-muted/50 transition-colors"
          >
            <h4 className={cn(textVariants({ variant: "h5" }), "flex-1")}>
              {faq.question}
            </h4>
            <ChevronDown
              className={cn(
                "w-5 h-5 flex-shrink-0 ml-3 transition-transform",
                expanded === faq.id && "rotate-180"
              )}
            />
          </button>

          {expanded === faq.id && (
            <div className="border-t border-border/40 p-4 bg-muted/30">
              <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-4")}>
                {faq.answer}
              </p>

              <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                <span className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  Was this helpful?
                </span>
                <Button variant="ghost" size="icon-xs">
                  <ThumbsUp className="w-3 h-3" />
                  <span className="text-xs ml-1">{faq.helpful}</span>
                </Button>
                <Button variant="ghost" size="icon-xs">
                  <ThumbsDown className="w-3 h-3" />
                  <span className="text-xs ml-1">{faq.notHelpful}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
