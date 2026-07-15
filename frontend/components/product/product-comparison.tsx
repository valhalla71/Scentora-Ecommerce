import { ChevronDown, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { ProductComparison } from "@/lib/products-advanced"

export interface ProductComparisonProps {
  products: ProductComparison[];
  dictionary: any;
}

export function ProductComparison({ products, dictionary }: ProductComparisonProps) {
  const { product } = dictionary.common;

  const attributes = [
    { key: "longevity", label: product.longevity },
    { key: "sillage", label: product.sillage },
    { key: "seasonality", label: product.seasonality },
    { key: "topNotes", label: product.topNotes },
    { key: "heartNotes", label: product.heartNotes },
    { key: "baseNotes", label: product.baseNotes },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/60">
            <th className="text-start p-3 font-semibold">Attribute</th>
            {products.map((p) => (
              <th key={p.id} className="text-center p-3 min-w-32">
                <div className="font-semibold text-base mb-1">{p.name}</div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{p.rating}</span>
                </div>
                <div className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                  {p.price}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attributes.map((attr) => (
            <tr key={attr.key} className="border-b border-border/40 hover:bg-muted/50">
              <td className="p-3 font-medium text-start">{attr.label}</td>
              {products.map((product) => (
                <td key={product.id} className="p-3 text-center">
                  {attr.key === "topNotes" && (
                    <div className="space-y-1">
                      {product.topNotes.map((note, i) => (
                        <div key={i} className="text-xs">{note}</div>
                      ))}
                    </div>
                  )}
                  {attr.key === "heartNotes" && (
                    <div className="space-y-1">
                      {product.heartNotes.map((note, i) => (
                        <div key={i} className="text-xs">{note}</div>
                      ))}
                    </div>
                  )}
                  {attr.key === "baseNotes" && (
                    <div className="space-y-1">
                      {product.baseNotes.map((note, i) => (
                        <div key={i} className="text-xs">{note}</div>
                      ))}
                    </div>
                  )}
                  {attr.key === "longevity" && product.longevity}
                  {attr.key === "sillage" && product.sillage}
                  {attr.key === "seasonality" && product.seasonality}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
