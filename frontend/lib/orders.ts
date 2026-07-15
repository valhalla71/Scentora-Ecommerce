export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  itemCount: number;
  total: string;
}

export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: "#ORD-001234",
    date: "July 10, 2026",
    status: "delivered",
    items: [
      {
        id: "item-001",
        name: "Midnight Elegance",
        quantity: 1,
        price: "$89.99",
      },
      {
        id: "item-002",
        name: "Rose Sanctuary",
        quantity: 1,
        price: "$75.99",
      },
    ],
    itemCount: 2,
    total: "$245.99",
  },
  {
    id: "order-002",
    orderNumber: "#ORD-001233",
    date: "June 28, 2026",
    status: "delivered",
    items: [
      {
        id: "item-003",
        name: "Citrus Bliss",
        quantity: 1,
        price: "$65.50",
      },
      {
        id: "item-004",
        name: "Vanilla Dreams",
        quantity: 1,
        price: "$79.00",
      },
      {
        id: "item-005",
        name: "Ocean Breeze",
        quantity: 1,
        price: "$45.00",
      },
    ],
    itemCount: 3,
    total: "$189.50",
  },
  {
    id: "order-003",
    orderNumber: "#ORD-001232",
    date: "June 15, 2026",
    status: "shipped",
    items: [
      {
        id: "item-006",
        name: "Royal Oud",
        quantity: 2,
        price: "$99.99",
      },
      {
        id: "item-007",
        name: "Floral Symphony",
        quantity: 1,
        price: "$112.77",
      },
    ],
    itemCount: 3,
    total: "$312.75",
  },
  {
    id: "order-004",
    orderNumber: "#ORD-001231",
    date: "May 30, 2026",
    status: "delivered",
    items: [
      {
        id: "item-008",
        name: "Leather Heritage",
        quantity: 1,
        price: "$145.00",
      },
    ],
    itemCount: 1,
    total: "$145.00",
  },
  {
    id: "order-005",
    orderNumber: "#ORD-001230",
    date: "May 12, 2026",
    status: "pending",
    items: [
      {
        id: "item-009",
        name: "Amber Sunset",
        quantity: 1,
        price: "$85.50",
      },
      {
        id: "item-010",
        name: "Spice Garden",
        quantity: 1,
        price: "$92.25",
      },
    ],
    itemCount: 2,
    total: "$177.75",
  },
  {
    id: "order-006",
    orderNumber: "#ORD-001229",
    date: "April 20, 2026",
    status: "delivered",
    items: [
      {
        id: "item-011",
        name: "Jasmine Night",
        quantity: 1,
        price: "$128.99",
      },
    ],
    itemCount: 1,
    total: "$128.99",
  },
  {
    id: "order-007",
    orderNumber: "#ORD-001228",
    date: "March 15, 2026",
    status: "cancelled",
    items: [
      {
        id: "item-012",
        name: "Sandalwood Mist",
        quantity: 1,
        price: "$110.00",
      },
    ],
    itemCount: 1,
    total: "$110.00",
  },
  {
    id: "order-008",
    orderNumber: "#ORD-001227",
    date: "February 28, 2026",
    status: "delivered",
    items: [
      {
        id: "item-013",
        name: "Lavender Cloud",
        quantity: 2,
        price: "$58.99",
      },
      {
        id: "item-014",
        name: "Ginger Soul",
        quantity: 1,
        price: "$76.50",
      },
    ],
    itemCount: 3,
    total: "$194.48",
  },
];
