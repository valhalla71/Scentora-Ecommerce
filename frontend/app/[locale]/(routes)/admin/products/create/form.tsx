"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CreateProductFormProps {
  locale: string;
  dictionary: any;
}

export function CreateProductForm({ locale, dictionary }: CreateProductFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
            required
            placeholder="Enter product name"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {dictionary.common.product?.category || "Category"}
          </label>
          <select className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground">
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
            required
            placeholder="$0.00"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Stock</label>
          <input
            type="number"
            required
            placeholder="0"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">
          {dictionary.common.product?.description || "Description"}
        </label>
        <textarea
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
            placeholder="e.g., Sandalwood, Musk"
            className="w-full mt-1 px-3 py-2 rounded border border-border bg-background text-foreground"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">
          Create Product
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
