import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { login, email, password, rememberMe, forgotPassword, dontHaveAccount, signIn } =
    dictionary.common.auth;

  return (
    <main
      style={{ paddingBlock: spacing.section.lg }}
      className="flex min-h-[calc(100vh-200px)] items-center"
    >
      <Container className="flex w-full justify-center">
        <AuthForm
          title={login}
          fields={[
            {
              name: "email",
              type: "email",
              label: email,
              placeholder: "you@example.com",
              required: true,
            },
            {
              name: "password",
              type: "password",
              label: password,
              placeholder: "••••••••",
              required: true,
            },
          ]}
          checkboxes={[
            {
              name: "remember",
              label: rememberMe,
            },
          ]}
          submitButtonText={signIn}
          linkText={dontHaveAccount}
          linkHref={`/${locale}/register`}
          additionalLinks={[
            {
              text: forgotPassword,
              href: "#",
            },
          ]}
        />
      </Container>
    </main>
  );
}
