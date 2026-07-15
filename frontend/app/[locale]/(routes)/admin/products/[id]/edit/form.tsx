"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EditProductFormProps {
  locale: string;
  dictionary: any;
  product: any;
}

export function EditProductForm({
  locale,
  dictionary,
  product,
}: EditProductFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const notes = product.topNotes || [];
  const heartNotes = product.heartNotes || [];
  const baseNotes = product.baseNotes || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background border border-border rounded-lg p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.name || "Product Name"}
          </label>
          <input
            type="text"
            defaultValue={product.name}
            required
            placeholder="Enter product name"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.category || "Category"}
          </label>
          <select
            defaultValue={product.category}
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          >
            <option>Oriental</option>
            <option>Fresh</option>
            <option>Floral</option>
            <option>Amber</option>
            <option>Woody</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.price || "Price"}
          </label>
          <input
            type="text"
            defaultValue={product.price}
            required
            placeholder="$0.00"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Rating</label>
          <input
            type="number"
            defaultValue={product.rating}
            disabled
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          {dictionary.common.product?.description || "Description"}
        </label>
        <textarea
          defaultValue={product.description}
          required
          placeholder="Enter product description"
          className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground h-24"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.topNotes || "Top Notes"}
          </label>
          <input
            type="text"
            defaultValue={notes.join(", ")}
            placeholder="e.g., Bergamot, Lemon"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.heartNotes || "Heart Notes"}
          </label>
          <input
            type="text"
            defaultValue={heartNotes.join(", ")}
            placeholder="e.g., Jasmine, Rose"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.baseNotes || "Base Notes"}
          </label>
          <input
            type="text"
            defaultValue={baseNotes.join(", ")}
            placeholder="e.g., Sandalwood, Musk"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">
          Save Changes
        </Button>
        <Link href={`/${locale}/admin/products`}>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
