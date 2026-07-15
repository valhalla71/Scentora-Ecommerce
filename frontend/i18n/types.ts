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
  profile: {
    title: string;
    personalInfo: string;
    name: string;
    email: string;
    phone: string;
    editProfile: string;
    preferences: string;
    newsletter: string;
    language: string;
    notifications: string;
    recentOrders: string;
    orderNumber: string;
    date: string;
    total: string;
    status: string;
    addressBook: string;
    addAddress: string;
    logout: string;
    viewDetails: string;
    edit: string;
    delete: string;
    setAsDefault: string;
  };
  wishlist: {
    title: string;
    empty: string;
    items: string;
    addToCart: string;
    remove: string;
    continueShopping: string;
    totalItems: string;
  };
  account: {
    title: string;
    welcome: string;
    sections: {
      orders: string;
      profile: string;
      wishlist: string;
      settings: string;
    };
    totalOrders: string;
    totalSpent: string;
  };
  orders: {
    title: string;
    empty: string;
    orderId: string;
    date: string;
    status: string;
    items: string;
    total: string;
    viewDetails: string;
    pending: string;
    shipped: string;
    delivered: string;
    cancelled: string;
  };
  checkout: {
    title: string;
    shippingInfo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    shippingMethod: string;
    standard: string;
    express: string;
    paymentMethod: string;
    creditCard: string;
    paypal: string;
    placeOrder: string;
    backToCart: string;
    orderSummary: string;
    items: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
  };
  orderSuccess: {
    title: string;
    confirmationMessage: string;
    orderNumber: string;
    orderDate: string;
    estimatedDelivery: string;
    shippingAddress: string;
    trackOrder: string;
    continueShopping: string;
  };
  discovery: {
    search: string;
    filters: string;
    sort: string;
    category: string;
    price: string;
    priceMin: string;
    priceMax: string;
    clearFilters: string;
    newest: string;
    priceLowToHigh: string;
    priceHighToLow: string;
    rating: string;
    noProducts: string;
    noProductsDescription: string;
    categories: {
      all: string;
      oriental: string;
      fresh: string;
      floral: string;
      amber: string;
      woody: string;
    };
  };
  reviews: {
    title: string;
    rating: string;
    sortBy: string;
    newest: string;
    helpful: string;
    noReviews: string;
    writeReview: string;
    verified: string;
  };
  recommendations: {
    title: string;
    relatedProducts: string;
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    subscribe: string;
    success: string;
  };
  about: {
    title: string;
    mission: string;
    values: string;
    quality: string;
    authenticity: string;
    service: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    phone: string;
    address: string;
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
