import type { Locale } from "./config";

export type CommonDictionary = {
  siteName: string;
  loading: string;
  error: string;
};

export type LayoutDictionary = {
  nav: {
    primary: string;
    home: string;
    about: string;
  };
  footer: {
    tagline: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  actions: {
    changeLanguage: string;
  };
};

export type HomeDictionary = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    items: {
      curated: { title: string; description: string };
      authentic: { title: string; description: string };
      experience: { title: string; description: string };
    };
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

/** Shape of all translation namespaces loaded per locale. */
export type Dictionary = {
  common: CommonDictionary;
  layout: LayoutDictionary;
  home: HomeDictionary;
};

/** Props injected by the `[locale]` dynamic segment across layouts and pages. */
export type LocaleParams = {
  locale: Locale;
};

export type LocaleParamsPromise = {
  params: Promise<LocaleParams>;
};
