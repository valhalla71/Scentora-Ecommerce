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

/** Shape of all translation namespaces loaded per locale. */
export type Dictionary = {
  common: CommonDictionary;
  layout: LayoutDictionary;
};

/** Props injected by the `[locale]` dynamic segment across layouts and pages. */
export type LocaleParams = {
  locale: Locale;
};

export type LocaleParamsPromise = {
  params: Promise<LocaleParams>;
};
