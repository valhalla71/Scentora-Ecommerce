"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useCommerce } from "@/components/providers/commerce-provider";
import { Button } from "@/components/ui/button";
import { textVariants } from "@/lib/design-system/typography";
import { cn } from "@/lib/utils";

export function ProtectedAccountContent({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const router = useRouter();
  const { user, sessionLoading, sessionError } = useCommerce();

  useEffect(() => {
    if (!sessionLoading && !user) {
      router.replace(`/${locale}/login`);
    }
  }, [locale, router, sessionLoading, user]);

  if (sessionLoading) {
    return <p className="py-12 text-center text-muted-foreground">Restoring session…</p>;
  }
  if (sessionError) {
    return <p className="py-12 text-center text-destructive">{sessionError}</p>;
  }
  if (!user) {
    return <p className="py-12 text-center text-muted-foreground">Redirecting to sign in…</p>;
  }

  return children;
}

export function ProfileIdentity({
  labels,
  locale,
}: {
  labels: { name: string; email: string; phone: string };
  locale: string;
}) {
  const { user, sessionLoading, sessionError } = useCommerce();

  if (sessionLoading) return <p className="p-6 text-muted-foreground">Loading profile…</p>;
  if (sessionError) return <p className="p-6 text-destructive">{sessionError}</p>;
  if (!user) {
    return (
      <p className="p-6 text-muted-foreground">
        You are not signed in. <a className="text-primary underline" href={`/${locale}/login`}>Sign in</a>
      </p>
    );
  }

  const values = [
    [labels.name, [user.firstName, user.lastName].filter(Boolean).join(" ") || "—"],
    [labels.email, user.email],
    [labels.phone, user.phone || "—"],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {values.map(([label, value]) => (
        <div key={label}>
          <p className={cn(textVariants({ variant: "label" }), "mb-1 text-muted-foreground")}>{label}</p>
          <p className={textVariants({ variant: "body" })}>{value}</p>
        </div>
      ))}
    </div>
  );
}

export function LogoutButton({ label, locale }: { label: string; locale: string }) {
  const router = useRouter();
  const { logout, user } = useCommerce();
  if (!user) return null;
  return (
    <Button
      variant="destructive"
      onClick={() => void logout().finally(() => router.push(`/${locale}/login`))}
    >
      {label}
    </Button>
  );
}

export function AccountWelcome({ prefix }: { prefix: string }) {
  const { user, sessionLoading } = useCommerce();
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  return <>{sessionLoading ? "…" : `${prefix}, ${name || user?.email || "Guest"}`}</>;
}
