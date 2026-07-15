"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export interface AdminSidebarProps {
  locale: string;
  translations: {
    admin: {
      title: string;
      dashboard: string;
      products: string;
      inventory: string;
      orders: string;
      users: string;
      analytics: string;
      settings: string;
    };
  };
}

export function AdminSidebar({ locale, translations }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const isRTL = locale === "fa";

  const links = [
    {
      href: `/${locale}/admin`,
      label: translations.admin.dashboard,
      key: "dashboard",
    },
    {
      href: `/${locale}/admin/products`,
      label: translations.admin.products,
      key: "products",
    },
    {
      href: `/${locale}/admin/inventory`,
      label: translations.admin.inventory,
      key: "inventory",
    },
    { href: `/${locale}/admin/orders`, label: translations.admin.orders, key: "orders" },
    { href: `/${locale}/admin/users`, label: translations.admin.users, key: "users" },
    {
      href: `/${locale}/admin/analytics`,
      label: translations.admin.analytics,
      key: "analytics",
    },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}/admin`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "border-border bg-background transition-all duration-300",
        isRTL ? "border-l" : "border-r",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 border-b border-border">
          <h2 className={cn("text-lg font-bold", isOpen ? "block" : "hidden")}>
            {translations.admin.title}
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.key}>
                <Link href={link.href}>
                  <Button
                    variant={isActive(link.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isRTL && "justify-end",
                      !isOpen && "justify-center",
                    )}
                    size="sm"
                  >
                    <span className={isOpen ? "block" : "hidden"}>{link.label}</span>
                    {!isOpen && <span className="text-xs">{link.label.charAt(0)}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full"
          >
            {isOpen ? "←" : "→"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
