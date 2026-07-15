"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";

interface FormField {
  name: string;
  type: "email" | "password" | "text";
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  checkboxes?: Array<{
    name: string;
    label: string;
  }>;
  submitButtonText: string;
  linkText: string;
  linkHref: string;
  additionalLinks?: Array<{
    text: string;
    href: string;
  }>;
}

export function AuthForm({
  title,
  description,
  fields,
  checkboxes,
  submitButtonText,
  linkText,
  linkHref,
  additionalLinks,
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    checkboxes?.reduce((acc, cb) => ({ ...acc, [cb.name]: false }), {}) || {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
    );
    setCheckedItems(
      checkboxes?.reduce((acc, cb) => ({ ...acc, [cb.name]: false }), {}) ||
        {},
    );
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="mb-8 text-center"
        style={{ marginBottom: spacing.gutter.lg }}
      >
        <h1 className={cn(textVariants({ variant: "h2" }), "mb-2")}>
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              textVariants({ variant: "bodySm" }),
              "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label
              htmlFor={field.name}
              className={cn(textVariants({ variant: "label" }))}
            >
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
              required={field.required}
              className={cn(
                "w-full rounded-lg border border-input bg-background px-3 py-2",
                "text-base outline-none transition-colors",
                "placeholder:text-muted-foreground",
                "focus:border-ring focus:ring-2 focus:ring-ring/50",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            />
          </div>
        ))}

        {checkboxes && checkboxes.length > 0 && (
          <div
            className="space-y-2.5"
            style={{ marginTop: spacing.gutter.md }}
          >
            {checkboxes.map((checkbox) => (
              <div key={checkbox.name} className="flex items-center gap-2">
                <input
                  id={checkbox.name}
                  name={checkbox.name}
                  type="checkbox"
                  checked={checkedItems[checkbox.name] || false}
                  onChange={handleCheckboxChange}
                  className={cn(
                    "size-4 rounded border border-input bg-background",
                    "cursor-pointer outline-none transition-colors",
                    "focus:border-ring focus:ring-2 focus:ring-ring/50",
                    "accent-primary",
                  )}
                />
                <label
                  htmlFor={checkbox.name}
                  className={cn(
                    textVariants({ variant: "bodySm" }),
                    "cursor-pointer",
                  )}
                >
                  {checkbox.label}
                </label>
              </div>
            ))}
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="default"
          disabled={isSubmitting}
          className="w-full"
          style={{ marginTop: spacing.gutter.lg }}
        >
          {isSubmitting ? "Loading..." : submitButtonText}
        </Button>
      </form>

      {additionalLinks && additionalLinks.length > 0 && (
        <div
          className="text-center"
          style={{ marginTop: spacing.gutter.md }}
        >
          {additionalLinks.map((link, index) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  textVariants({ variant: "bodySm" }),
                  "text-primary hover:underline",
                )}
              >
                {link.text}
              </Link>
              {index < additionalLinks.length - 1 && (
                <span className="mx-2 text-muted-foreground">•</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className="mt-6 text-center"
        style={{ marginTop: spacing.gutter.lg }}
      >
        <p className={cn(textVariants({ variant: "bodySm" }))}>
          {linkText}
          {" "}
          <Link
            href={linkHref}
            className="text-primary hover:underline font-semibold"
          >
            {linkHref.includes("register") ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
