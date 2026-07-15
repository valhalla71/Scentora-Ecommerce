import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { AuthForm } from "@/components/auth/auth-form";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { spacing } from "@/lib/design-system/tokens";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dictionary = await getDictionary(locale);

  const { register, email, password, confirmPassword, fullName, terms, alreadyHaveAccount, signUp } =
    dictionary.common.auth;

  return (
    <main
      style={{ paddingBlock: spacing.section.lg }}
      className="flex min-h-[calc(100vh-200px)] items-center"
    >
      <Container className="flex w-full justify-center">
        <AuthForm
          title={register}
          fields={[
            {
              name: "fullname",
              type: "text",
              label: fullName,
              placeholder: "John Doe",
              required: true,
            },
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
            {
              name: "confirmPassword",
              type: "password",
              label: confirmPassword,
              placeholder: "••••••••",
              required: true,
            },
          ]}
          checkboxes={[
            {
              name: "terms",
              label: terms,
            },
          ]}
          submitButtonText={signUp}
          linkText={alreadyHaveAccount}
          linkHref={`/${locale}/login`}
        />
      </Container>
    </main>
  );
}
