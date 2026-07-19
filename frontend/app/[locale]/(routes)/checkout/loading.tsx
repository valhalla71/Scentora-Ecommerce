import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export default function CheckoutLoading() {
  return (
    <Container className="py-8">
      <div className="mb-8 h-10 w-48 rounded bg-muted animate-pulse" />
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout form skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Progress bar */}
            <div className="mb-8 flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-2 rounded bg-muted animate-pulse" />
              ))}
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                    <div className="h-10 rounded bg-muted animate-pulse" />
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                <div className="h-10 rounded bg-muted animate-pulse" />
              </div>

              <div className="flex gap-3 pt-6 border-t border-border/40">
                <div className="h-10 w-24 rounded bg-muted animate-pulse" />
                <div className="h-10 w-32 rounded bg-muted animate-pulse ms-auto" />
              </div>
            </div>
          </Card>
        </div>

        {/* Order summary skeleton */}
        <Card className="p-6 h-fit">
          <div className="h-6 w-32 rounded bg-muted animate-pulse mb-6" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 h-16 rounded bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border/40">
            <div className="flex justify-between mb-4">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="h-6 w-20 rounded bg-muted animate-pulse" />
              <div className="h-6 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
