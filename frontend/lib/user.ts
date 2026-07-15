export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  preferences: {
    newsletter: boolean;
    emailNotifications: boolean;
    language: "en" | "fa";
  };
}

export const mockUser: User = {
  id: "user-001",
  name: "Sarah Anderson",
  email: "sarah.anderson@example.com",
  phone: "+1 (555) 123-4567",
  addresses: [
    {
      id: "addr-001",
      fullName: "Sarah Anderson",
      street: "123 Oak Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-002",
      fullName: "Sarah Anderson",
      street: "456 Pine Avenue",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "order-001",
      orderNumber: "#ORD-001234",
      date: "July 10, 2026",
      total: "$245.99",
      status: "delivered",
    },
    {
      id: "order-002",
      orderNumber: "#ORD-001233",
      date: "June 28, 2026",
      total: "$189.50",
      status: "delivered",
    },
    {
      id: "order-003",
      orderNumber: "#ORD-001232",
      date: "June 15, 2026",
      total: "$312.75",
      status: "shipped",
    },
  ],
  preferences: {
    newsletter: true,
    emailNotifications: true,
    language: "en",
  },
};
