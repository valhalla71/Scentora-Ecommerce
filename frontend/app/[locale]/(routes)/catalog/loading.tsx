import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";

export default function CatalogLoading() {
  return (
    <Container className="py-8">
      {/* Search bar skeleton */}
      <div className="mb-6 h-12 rounded-lg bg-muted animate-pulse" />

      {/* Category nav skeleton */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-24 rounded-lg bg-muted animate-pulse shrink-0" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters sidebar skeleton */}
        <aside className="hidden lg:block">
          <div className="space-y-4">
            <div className="h-8 w-32 rounded bg-muted animate-pulse" />
            <div className="h-64 rounded-lg bg-muted animate-pulse" />
          </div>
        </aside>

        {/* Products grid skeleton */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <div className="h-10 w-32 rounded bg-muted animate-pulse" />
            <div className="h-6 w-24 rounded bg-muted animate-pulse" />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <div className="aspect-square rounded-lg bg-muted animate-pulse mb-4" />
                <div className="h-6 w-3/4 rounded bg-muted animate-pulse mb-2" />
                <div className="h-4 w-1/2 rounded bg-muted animate-pulse mb-2" />
                <div className="h-4 w-1/4 rounded bg-muted animate-pulse mb-4" />
                <div className="h-10 rounded bg-muted animate-pulse" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
