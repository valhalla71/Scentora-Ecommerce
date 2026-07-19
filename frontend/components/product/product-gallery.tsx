"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  name: string;
  galleryLabel: string;
};

/**
 * Luxury product image presentation — large main image with an optional
 * thumbnail strip when more than one image is available. `data-slot`
 * markers on the main frame are a reserved hook for a future 3D/AR
 * visualization to swap in without restructuring this component.
 */
export function ProductGallery({ images, name, galleryLabel }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div data-slot="product-gallery" className="flex flex-col gap-4">
      <div
        data-slot="gallery-main"
        role="img"
        aria-label={activeImage ? `${galleryLabel}: ${name}` : name}
        className="hover-lift relative aspect-square w-full overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-muted to-muted/60 bg-cover bg-center shadow-luxury-md"
        style={activeImage ? { backgroundImage: `url("${activeImage}")` } : undefined}
      >
        {!activeImage ? (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-muted-foreground">
            {name}
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1" aria-label={galleryLabel}>
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${name} ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ease-luxury sm:size-20",
                index === activeIndex
                  ? "border-primary shadow-luxury-sm"
                  : "border-border/50 opacity-70 hover:opacity-100",
              )}
            >
              <span
                aria-hidden="true"
                className="block h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${image}")` }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
