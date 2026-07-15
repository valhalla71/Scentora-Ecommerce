import { Container } from "@/components/layout/container";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { NotificationsCenter } from "@/components/admin/notifications-center";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { mockNotifications } from "@/lib/admin";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        locale={locale}
        translations={{
          admin: dictionary.common.admin as any,
        }}
      />
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <NotificationsCenter
            notifications={mockNotifications}
            translations={{
              notifications: dictionary.common.notifications as any,
            }}
          />
        </div>
        <main className="flex-1 overflow-auto">
          <Container size="wide" className="py-6">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}
