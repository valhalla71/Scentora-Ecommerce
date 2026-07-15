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
    gallery: string;
    selectSize: string;
    selectVariant: string;
    frequentlyBoughtTogether: string;
    productFAQ: string;
    askQuestion: string;
    compare: string;
    compareProducts: string;
    longevity: string;
    sillage: string;
    seasonality: string;
    volume: string;
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
    saveForLater: string;
    savedItems: string;
    applyCoupon: string;
    couponCode: string;
    promoCode: string;
    discount: string;
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
    notificationSettings: string;
    emailPreferences: string;
    smsPreferences: string;
    pushNotifications: string;
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
      addresses: string;
      preferences: string;
      notifications: string;
    };
    totalOrders: string;
    totalSpent: string;
    rewardPoints: string;
    memberSince: string;
    nextTierThreshold: string;
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
    processing: string;
    outForDelivery: string;
    filterBy: string;
    sortBy: string;
    recentFirst: string;
    oldestFirst: string;
    trackOrder: string;
    orderTracking: string;
    estimatedDelivery: string;
    shippingAddress: string;
    invoiceDownload: string;
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
    state: string;
    zipCode: string;
    country: string;
    shippingMethod: string;
    standard: string;
    express: string;
    overnight: string;
    storePickup: string;
    paymentMethod: string;
    creditCard: string;
    debitCard: string;
    paypal: string;
    applePay: string;
    placeOrder: string;
    backToCart: string;
    orderSummary: string;
    items: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    progressStep1: string;
    progressStep2: string;
    progressStep3: string;
    progressStep4: string;
    selectShippingOption: string;
    selectPaymentMethod: string;
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
    notHelpful: string;
    noReviews: string;
    writeReview: string;
    verified: string;
    markHelpful: string;
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
  blog: {
    title: string;
    allPosts: string;
    category: string;
    readMore: string;
    readingTime: string;
    author: string;
    publishDate: string;
    tags: string;
    relatedPosts: string;
    noPosts: string;
    shareArticle: string;
  };
  addresses: {
    title: string;
    addNew: string;
    edit: string;
    delete: string;
    setAsDefault: string;
    shippingAddress: string;
    billingAddress: string;
    type: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    noAddresses: string;
  };
  preferences: {
    title: string;
    language: string;
    currency: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
    save: string;
    saved: string;
  };
  shippingOptions: {
    title: string;
    selectShippingMethod: string;
    estimatedDelivery: string;
    days: string;
  };
  paymentMethods: {
    title: string;
    addNew: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    setAsDefault: string;
    noMethods: string;
    save: string;
  };
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
  metrics: {
    totalSales: string;
    totalOrders: string;
    totalUsers: string;
    revenue: string;
    conversionRate: string;
    averageOrderValue: string;
  };
  productManagement: {
    title: string;
    create: string;
    edit: string;
    delete: string;
    search: string;
    name: string;
    price: string;
    stock: string;
    status: string;
    actions: string;
    category: string;
  };
  inventory: {
    title: string;
    productName: string;
    quantity: string;
    reorderLevel: string;
    status: string;
    inStock: string;
    lowStock: string;
    outOfStock: string;
  };
  orderManagement: {
    title: string;
    orderId: string;
    customer: string;
    date: string;
    status: string;
    total: string;
    markShipped: string;
    markDelivered: string;
  };
  userManagement: {
    title: string;
    userId: string;
    joinDate: string;
    status: string;
    active: string;
    inactive: string;
  };
  analytics: {
    title: string;
    topProducts: string;
    customerInsights: string;
    dateRange: string;
  };
  notifications: {
    title: string;
    markAsRead: string;
    clearAll: string;
    noNotifications: string;
  };
  errors: {
    notFound: {
      title: string;
      description: string;
      goHome: string;
      browseProducts: string;
    };
  };
};

export type LayoutDictionary = {
  nav: {
    primary: string;
    home: string;
    catalog: string;
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
    toggleMenu: string;
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
