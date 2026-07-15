"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system/tokens";
import { textVariants } from "@/lib/design-system/typography";
import type { CommonDictionary } from "@/i18n/types";

interface CheckoutFormProps {
  dictionary: CommonDictionary;
  onSubmit?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  shippingMethod: string;
  paymentMethod: string;
}

export function CheckoutForm({ dictionary, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    shippingMethod: "standard",
    paymentMethod: "creditCard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    onSubmit?.();
  };

  const { checkout } = dictionary;

  const fields = [
    {
      name: "firstName",
      label: checkout.firstName,
      placeholder: checkout.firstName,
    },
    {
      name: "lastName",
      label: checkout.lastName,
      placeholder: checkout.lastName,
    },
    { name: "email", label: checkout.email, placeholder: checkout.email },
    { name: "phone", label: checkout.phone, placeholder: checkout.phone },
    {
      name: "address",
      label: checkout.address,
      placeholder: checkout.address,
    },
    { name: "city", label: checkout.city, placeholder: checkout.city },
    {
      name: "zipCode",
      label: checkout.zipCode,
      placeholder: checkout.zipCode,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3
          className={cn(
            textVariants({ variant: "h4" }),
            "mb-4 text-base font-semibold",
          )}
        >
          {checkout.shippingInfo}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label
                htmlFor={field.name}
                className={cn(textVariants({ variant: "label" }))}
              >
                {field.label}
                <span className="text-destructive"> *</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                placeholder={field.placeholder}
                value={formData[field.name as keyof FormData]}
                onChange={handleInputChange}
                required
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
        </div>
      </div>

      <div>
        <h3
          className={cn(
            textVariants({ variant: "h4" }),
            "mb-4 text-base font-semibold",
          )}
        >
          {checkout.shippingMethod}
        </h3>
        <div className="space-y-2">
          {[
            { value: "standard", label: checkout.standard },
            { value: "express", label: checkout.express },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <input
                id={`shipping-${option.value}`}
                type="radio"
                name="shippingMethod"
                value={option.value}
                checked={formData.shippingMethod === option.value}
                onChange={handleInputChange}
                className={cn(
                  "size-4 rounded-full border-2 border-input bg-background",
                  "cursor-pointer outline-none transition-colors",
                  "focus:border-ring focus:ring-2 focus:ring-ring/50",
                  "accent-primary",
                )}
              />
              <label
                htmlFor={`shipping-${option.value}`}
                className={cn(textVariants({ variant: "bodySm" }), "cursor-pointer")}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          className={cn(
            textVariants({ variant: "h4" }),
            "mb-4 text-base font-semibold",
          )}
        >
          {checkout.paymentMethod}
        </h3>
        <div className="space-y-2">
          {[
            { value: "creditCard", label: checkout.creditCard },
            { value: "paypal", label: checkout.paypal },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <input
                id={`payment-${option.value}`}
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={formData.paymentMethod === option.value}
                onChange={handleInputChange}
                className={cn(
                  "size-4 rounded-full border-2 border-input bg-background",
                  "cursor-pointer outline-none transition-colors",
                  "focus:border-ring focus:ring-2 focus:ring-ring/50",
                  "accent-primary",
                )}
              />
              <label
                htmlFor={`payment-${option.value}`}
                className={cn(textVariants({ variant: "bodySm" }), "cursor-pointer")}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        size="default"
        disabled={isSubmitting}
        className="w-full"
        style={{ marginTop: spacing.gutter.lg }}
      >
        {isSubmitting ? "Loading..." : dictionary.checkout.placeOrder}
      </Button>
    </form>
  );
}
