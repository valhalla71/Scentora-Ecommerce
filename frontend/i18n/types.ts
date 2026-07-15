import type { Locale } from "./config";

export type CommonDictionary = {
  siteName: string;
  loading: string;
  error: string;
  catalog: {
    title: string;
    description: string;
    addToCart: string;
  };
  product: {
    price: string;
    category: string;
    rating: string;
    reviews: string;
    description: string;
    notes: string;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
    addToCart: string;
    addToWishlist: string;
    relatedProducts: string;
  };
  cart: {
    title: string;
    empty: string;
    product: string;
    quantity: string;
    price: string;
    subtotal: string;
    tax: string;
    total: string;
    remove: string;
    continueShopping: string;
    checkout: string;
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    rememberMe: string;
    forgotPassword: string;
    dontHaveAccount: string;
    alreadyHaveAccount: string;
    signUp: string;
    signIn: string;
    terms: string;
  };
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
  showcase: {
    title: string;
    description: string;
    viewAll: string;
  };
  testimonials: {
    title: string;
    items: Array<{
      text: string;
      author: string;
      role: string;
    }>;
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
