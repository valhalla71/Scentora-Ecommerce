// Commerce related mock data (shipping, payment, order tracking, etc.)

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: string;
  estimatedDays: { min: number; max: number };
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "paypal" | "apple_pay";
  isDefault: boolean;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  cardHolder: string;
}

export interface OrderTrackingEvent {
  id: string;
  status: "pending" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
  timestamp: string;
  location?: string;
  description: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  minPurchase?: string;
  expiryDate: string;
  applicableCategories: string[];
}

export const mockShippingOptions: ShippingOption[] = [
  {
    id: "shipping-standard",
    name: "Standard Shipping",
    description: "Delivery to your address",
    price: "$5.99",
    estimatedDays: { min: 5, max: 7 },
  },
  {
    id: "shipping-express",
    name: "Express Shipping",
    description: "Faster delivery with tracking",
    price: "$14.99",
    estimatedDays: { min: 2, max: 3 },
  },
  {
    id: "shipping-overnight",
    name: "Overnight Shipping",
    description: "Next day delivery",
    price: "$29.99",
    estimatedDays: { min: 1, max: 1 },
  },
  {
    id: "shipping-pickup",
    name: "Store Pickup",
    description: "Pick up at your nearest store",
    price: "$0.00",
    estimatedDays: { min: 1, max: 2 },
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-001",
    type: "credit_card",
    isDefault: true,
    lastFour: "4242",
    expiryMonth: 12,
    expiryYear: 2026,
    cardHolder: "John Doe",
  },
  {
    id: "pm-002",
    type: "credit_card",
    isDefault: false,
    lastFour: "5555",
    expiryMonth: 8,
    expiryYear: 2027,
    cardHolder: "John Doe",
  },
  {
    id: "pm-003",
    type: "paypal",
    isDefault: false,
    lastFour: "john@example.com".slice(-4),
    expiryMonth: 0,
    expiryYear: 0,
    cardHolder: "PayPal - john@example.com",
  },
];

export const mockOrderTrackingEvents: OrderTrackingEvent[] = [
  {
    id: "track-001",
    status: "delivered",
    timestamp: "2026-07-18T15:30:00Z",
    location: "New York, NY",
    description: "Package delivered",
  },
  {
    id: "track-002",
    status: "out_for_delivery",
    timestamp: "2026-07-18T08:00:00Z",
    location: "New York, NY",
    description: "Out for delivery",
  },
  {
    id: "track-003",
    status: "shipped",
    timestamp: "2026-07-16T14:20:00Z",
    location: "Distribution Center",
    description: "Package shipped",
  },
  {
    id: "track-004",
    status: "processing",
    timestamp: "2026-07-15T10:45:00Z",
    location: "Warehouse",
    description: "Order being processed",
  },
  {
    id: "track-005",
    status: "pending",
    timestamp: "2026-07-14T16:30:00Z",
    location: "Warehouse",
    description: "Order received",
  },
];

export const mockPromoCodes: PromoCode[] = [
  {
    code: "SUMMER20",
    discount: 20,
    discountType: "percentage",
    minPurchase: "$50.00",
    expiryDate: "2026-08-31",
    applicableCategories: ["all"],
  },
  {
    code: "WELCOME10",
    discount: 10,
    discountType: "percentage",
    minPurchase: "$25.00",
    expiryDate: "2026-12-31",
    applicableCategories: ["all"],
  },
  {
    code: "FRESH15",
    discount: 15,
    discountType: "percentage",
    minPurchase: "$75.00",
    expiryDate: "2026-09-30",
    applicableCategories: ["fresh"],
  },
  {
    code: "SAVE25",
    discount: 25,
    discountType: "fixed",
    minPurchase: "$100.00",
    expiryDate: "2026-08-15",
    applicableCategories: ["all"],
  },
];

export const mockCartSaveForLater = [
  {
    id: "save-001",
    productId: "prod-001",
    name: "Winter Woods",
    price: "$95.00",
    category: "Woody",
    savedDate: "2026-07-10",
  },
  {
    id: "save-002",
    productId: "prod-002",
    name: "Garden Secrets",
    price: "$88.50",
    category: "Floral",
    savedDate: "2026-07-08",
  },
];
