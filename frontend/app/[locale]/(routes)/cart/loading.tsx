import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export default function CartLoading() {
  return (
    <Container className="py-8">
      <div className="mb-8 h-10 w-48 rounded bg-muted animate-pulse" />
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart items skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 pb-4 mb-4 border-b border-border/40 last:border-0">
                <div className="w-20 h-20 rounded bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-1/4 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Order summary skeleton */}
        <Card className="p-6 h-fit">
          <div className="h-6 w-32 rounded bg-muted animate-pulse mb-6" />
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-16 rounded bg-muted animate-pulse" />
              <div className="h-4 w-12 rounded bg-muted animate-pulse" />
            </div>
          </div>
          <div className="pt-4 border-t border-border/40 mb-6">
            <div className="flex justify-between">
              <div className="h-6 w-20 rounded bg-muted animate-pulse" />
              <div className="h-6 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
          <div className="h-12 rounded bg-muted animate-pulse" />
        </Card>
      </div>
    </Container>
  );
}
