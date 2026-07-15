import { Home } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen py-12">
      <Container className="max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 text-9xl font-bold text-primary/10">
            404
          </div>
          
          <h1 className={cn(textVariants({ variant: "h1" }), "mb-3 text-balance")}>
            Page Not Found
          </h1>
          
          <p className={cn(textVariants({ variant: "body" }), "mb-8 text-muted-foreground")}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <Link href="/" className="w-full">
              <Button className="w-full gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/catalog" className="w-full">
              <Button variant="outline" className="w-full">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
