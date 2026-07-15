// User profile and account related mock data

export interface UserAddress {
  id: string;
  type: "billing" | "shipping" | "both";
  isDefault: boolean;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface UserPreferences {
  language: "en" | "fa";
  currency: "USD" | "EUR" | "GBP";
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  smsNotifications: boolean;
  newsletter: boolean;
}

export interface Notification {
  id: string;
  type: "order" | "promotion" | "review" | "general";
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export const mockUserAddresses: UserAddress[] = [
  {
    id: "addr-001",
    type: "both",
    isDefault: true,
    firstName: "John",
    lastName: "Doe",
    street: "123 Perfume Lane",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "addr-002",
    type: "shipping",
    isDefault: false,
    firstName: "John",
    lastName: "Doe",
    street: "456 Aroma Avenue",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "United States",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "addr-003",
    type: "billing",
    isDefault: false,
    firstName: "John",
    lastName: "Doe",
    street: "789 Fragrance Road",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "United States",
    phone: "+1 (555) 456-7890",
  },
];

export const mockUserPreferences: UserPreferences = {
  language: "en",
  currency: "USD",
  theme: "system",
  emailNotifications: true,
  smsNotifications: false,
  newsletter: true,
};

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "order",
    title: "Order Shipped",
    message: "Your order #ORD-001234 has been shipped and is on its way!",
    read: false,
    timestamp: "2026-07-14T10:30:00Z",
    actionUrl: "/account/orders/order-001",
  },
  {
    id: "notif-002",
    type: "promotion",
    title: "Special Offer",
    message: "Get 20% off on all fragrances this weekend only",
    read: false,
    timestamp: "2026-07-14T08:00:00Z",
  },
  {
    id: "notif-003",
    type: "review",
    title: "Rate Your Purchase",
    message: "How was your experience with Midnight Elegance?",
    read: true,
    timestamp: "2026-07-13T14:20:00Z",
  },
  {
    id: "notif-004",
    type: "general",
    title: "New Collection Available",
    message: "Check out our latest summer collection of fresh fragrances",
    read: true,
    timestamp: "2026-07-12T09:15:00Z",
  },
];

export const mockUserStats = {
  totalOrders: 8,
  totalSpent: "$1,398.46",
  nextTierThreshold: "$600",
  rewardPoints: 1398,
  memberSince: "March 2025",
};
