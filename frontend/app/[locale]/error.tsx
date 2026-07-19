"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
          </div>
          
          <h1 className={cn(textVariants({ variant: "h2" }), "mb-4")}>
            Something went wrong
          </h1>
          
          <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground mb-8")}>
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>

          {error.digest && (
            <p className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground mb-6 font-mono")}>
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="w-full">
              <RefreshCcw className="w-4 h-4 me-2" />
              Try Again
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 me-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
