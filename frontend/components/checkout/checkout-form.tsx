"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Radio } from "@/components/ui/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
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
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: string;
  paymentMethod: string;
  agreeTerms: boolean;
}

export function CheckoutForm({ dictionary, onSubmit }: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
    paymentMethod: "creditCard",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ["Shipping", "Payment", "Review"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    
    if (currentStep === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = true;
      if (!formData.lastName.trim()) newErrors.lastName = true;
      if (!formData.email.trim()) newErrors.email = true;
      if (!formData.phone.trim()) newErrors.phone = true;
      if (!formData.address.trim()) newErrors.address = true;
      if (!formData.city.trim()) newErrors.city = true;
      if (!formData.zipCode.trim()) newErrors.zipCode = true;
    }
    
    if (currentStep === 2) {
      if (!formData.agreeTerms) newErrors.agreeTerms = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onSubmit?.();
  };

  const { checkout } = dictionary;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress */}
      <CheckoutProgress steps={steps} currentStep={currentStep} />

      {/* Step 0: Shipping Information */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div>
            <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
              {checkout.shippingInfo}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.firstName}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="firstName"
                  placeholder={checkout.firstName}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                />
              </div>
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.lastName}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="lastName"
                  placeholder={checkout.lastName}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                />
              </div>
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.email}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder={checkout.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                />
              </div>
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.phone}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="phone"
                  placeholder={checkout.phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.address}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="address"
                  placeholder={checkout.address}
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                />
              </div>
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.city}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="city"
                  placeholder={checkout.city}
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                />
              </div>
              <div>
                <label className={cn(textVariants({ variant: "label" }), "block mb-2")}>
                  {checkout.zipCode}
                  <span className="text-destructive"> *</span>
                </label>
                <Input
                  name="zipCode"
                  placeholder={checkout.zipCode}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={!!errors.zipCode}
                />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="border-t border-border/60 pt-6">
            <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
              {checkout.shippingMethod}
            </h3>
            <div className="space-y-3">
              {[
                { value: "standard", label: checkout.standard, price: "Free" },
                { value: "express", label: checkout.express, price: "$15" },
              ].map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                    formData.shippingMethod === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:border-border"
                  )}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      shippingMethod: option.value,
                    }))
                  }
                >
                  <Radio
                    name="shippingMethod"
                    value={option.value}
                    checked={formData.shippingMethod === option.value}
                    onChange={handleInputChange}
                  />
                  <div className="flex-1">
                    <p className={cn(textVariants({ variant: "bodySm" }), "font-medium")}>
                      {option.label}
                    </p>
                    <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
                      {option.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Payment Method */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className={cn(textVariants({ variant: "h4" }), "mb-4")}>
              {checkout.paymentMethod}
            </h3>
            <div className="space-y-3">
              {[
                { value: "creditCard", label: checkout.creditCard },
                { value: "paypal", label: checkout.paypal },
              ].map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors",
                    formData.paymentMethod === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:border-border"
                  )}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: option.value,
                    }))
                  }
                >
                  <Radio
                    name="paymentMethod"
                    value={option.value}
                    checked={formData.paymentMethod === option.value}
                    onChange={handleInputChange}
                  />
                  <label className={cn(textVariants({ variant: "bodySm" }), "font-medium cursor-pointer flex-1")}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Review */}
      {currentStep === 2 && (
        <div className="space-y-6 border border-border/60 rounded-lg p-6 bg-muted/30">
          <div>
            <p className={cn(textVariants({ variant: "label" }), "mb-2 text-foreground")}>
              Shipping Address
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {formData.firstName} {formData.lastName}
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {formData.address}
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground")}>
              {formData.city}, {formData.zipCode}
            </p>
          </div>
          <div className="border-t border-border/60 pt-4">
            <p className={cn(textVariants({ variant: "label" }), "mb-2 text-foreground")}>
              Shipping Method
            </p>
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground capitalize")}>
              {formData.shippingMethod}
            </p>
          </div>
          <div className="border-t border-border/60 pt-4">
            <Checkbox
              id="terms"
              label="I agree to the terms and conditions"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              name="agreeTerms"
            />
            {errors.agreeTerms && (
              <p className="text-xs text-destructive mt-2">You must agree to continue</p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between pt-6 border-t border-border/60">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
        >
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            variant="default"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        )}
      </div>
    </form>
  );
}
