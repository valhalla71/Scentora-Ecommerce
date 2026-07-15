"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
  };
}

export function ContactForm({ contact }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsLoading(false);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className={cn(textVariants({ variant: "label" }), "mb-2 block")}
          >
            {contact.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            placeholder={contact.name}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className={cn(textVariants({ variant: "label" }), "mb-2 block")}
          >
            {contact.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            placeholder={contact.email}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className={cn(textVariants({ variant: "label" }), "mb-2 block")}
        >
          {contact.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          placeholder={contact.subject}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className={cn(textVariants({ variant: "label" }), "mb-2 block")}
        >
          {contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring resize-none"
          placeholder={contact.message}
        />
      </div>

      {isSubmitted ? (
        <div className="rounded-lg bg-green-50 p-4 text-green-700">
          <p className={textVariants({ variant: "body" })}>
            Thank you for your message! We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "..." : contact.send}
        </Button>
      )}
    </form>
  );
}
