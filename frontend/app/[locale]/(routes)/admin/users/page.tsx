import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { mockUsers, formatDate } from "@/lib/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function UsersPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {dictionary.common.userManagement?.title || "User Management"}
          </h1>
        </div>
        <Button>Export Users</Button>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.userManagement?.userId || "User ID"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.userManagement?.joinDate || "Join Date"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold text-foreground">
                {dictionary.common.userManagement?.status || "Status"}
              </th>
              <th className="px-4 py-3 text-start text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{user.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{user.name}</td>
                <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                <td className="px-4 py-3 text-sm text-foreground">{formatDate(user.joinDate)}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {user.status === "active"
                      ? dictionary.common.userManagement?.active || "Active"
                      : dictionary.common.userManagement?.inactive || "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <Button variant="outline" size="xs">
                    View
                  </Button>
                  <Button variant="outline" size="xs">
                    Edit
                  </Button>
                  <Button variant="destructive" size="xs">
                    Deactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
