import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";

/**
 * Root `/` route — redirects to the default locale.
 * Locale-specific pages will live under `app/[locale]/(routes)/`.
 *
 * The original create-next-app starter content is preserved in git history
 * and should be recreated at `app/[locale]/(routes)/page.tsx` when ready.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
