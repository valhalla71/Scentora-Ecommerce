import type { Product } from "./products";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "active" | "inactive";
}

export interface AdminOrder {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: string;
  items: number;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  stock: number;
  reorderLevel: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface Notification {
  id: string;
  type: "order" | "inventory" | "user" | "system";
  message: string;
  timestamp: string;
  read: boolean;
  action?: string | null;
}

export const mockUsers: AdminUser[] = [
  {
    id: "U001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "U002",
    name: "Michael Chen",
    email: "michael@example.com",
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "U003",
    name: "Emma Davis",
    email: "emma@example.com",
    joinDate: "2024-03-10",
    status: "active",
  },
  {
    id: "U004",
    name: "James Wilson",
    email: "james@example.com",
    joinDate: "2024-04-05",
    status: "inactive",
  },
  {
    id: "U005",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    joinDate: "2024-05-12",
    status: "active",
  },
];

export const mockOrders: AdminOrder[] = [
  {
    id: "ORD-001",
    customerId: "U001",
    customerName: "Sarah Johnson",
    date: "2024-07-14",
    status: "delivered",
    total: "$245.99",
    items: 3,
  },
  {
    id: "ORD-002",
    customerId: "U002",
    customerName: "Michael Chen",
    date: "2024-07-13",
    status: "shipped",
    total: "$189.50",
    items: 2,
  },
  {
    id: "ORD-003",
    customerId: "U003",
    customerName: "Emma Davis",
    date: "2024-07-12",
    status: "pending",
    total: "$325.00",
    items: 4,
  },
  {
    id: "ORD-004",
    customerId: "U004",
    customerName: "James Wilson",
    date: "2024-07-11",
    status: "shipped",
    total: "$145.75",
    items: 1,
  },
  {
    id: "ORD-005",
    customerId: "U005",
    customerName: "Lisa Anderson",
    date: "2024-07-10",
    status: "delivered",
    total: "$412.25",
    items: 5,
  },
  {
    id: "ORD-006",
    customerId: "U001",
    customerName: "Sarah Johnson",
    date: "2024-07-09",
    status: "delivered",
    total: "$178.99",
    items: 2,
  },
  {
    id: "ORD-007",
    customerId: "U003",
    customerName: "Emma Davis",
    date: "2024-07-08",
    status: "pending",
    total: "$265.50",
    items: 3,
  },
  {
    id: "ORD-008",
    customerId: "U002",
    customerName: "Michael Chen",
    date: "2024-07-07",
    status: "delivered",
    total: "$195.00",
    items: 2,
  },
  {
    id: "ORD-009",
    customerId: "U005",
    customerName: "Lisa Anderson",
    date: "2024-07-06",
    status: "shipped",
    total: "$310.75",
    items: 3,
  },
  {
    id: "ORD-010",
    customerId: "U004",
    customerName: "James Wilson",
    date: "2024-07-05",
    status: "delivered",
    total: "$220.00",
    items: 2,
  },
];

export const mockInventory: InventoryItem[] = [
  {
    productId: "1",
    productName: "Midnight Elegance",
    stock: 45,
    reorderLevel: 20,
    status: "in-stock",
  },
  {
    productId: "2",
    productName: "Rose Garden",
    stock: 8,
    reorderLevel: 20,
    status: "low-stock",
  },
  {
    productId: "3",
    productName: "Citrus Dawn",
    stock: 32,
    reorderLevel: 20,
    status: "in-stock",
  },
  {
    productId: "4",
    productName: "Amber Noir",
    stock: 0,
    reorderLevel: 15,
    status: "out-of-stock",
  },
  {
    productId: "5",
    productName: "Vanilla Sunset",
    stock: 62,
    reorderLevel: 20,
    status: "in-stock",
  },
  {
    productId: "6",
    productName: "Ocean Breeze",
    stock: 15,
    reorderLevel: 20,
    status: "low-stock",
  },
  {
    productId: "7",
    productName: "Oud Symphony",
    stock: 28,
    reorderLevel: 10,
    status: "in-stock",
  },
  {
    productId: "8",
    productName: "Jasmine Pearl",
    stock: 51,
    reorderLevel: 20,
    status: "in-stock",
  },
  {
    productId: "9",
    productName: "Sandalwood Dreams",
    stock: 5,
    reorderLevel: 20,
    status: "low-stock",
  },
  {
    productId: "10",
    productName: "Lavender Serenity",
    stock: 88,
    reorderLevel: 30,
    status: "in-stock",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    type: "order",
    message: "New order ORD-010 received from Sarah Johnson",
    timestamp: "2024-07-15T09:30:00",
    read: false,
    action: "View Order",
  },
  {
    id: "N002",
    type: "inventory",
    message: "Rose Garden stock is running low (8 units)",
    timestamp: "2024-07-15T08:45:00",
    read: false,
    action: "Reorder",
  },
  {
    id: "N003",
    type: "inventory",
    message: "Amber Noir is out of stock",
    timestamp: "2024-07-15T07:20:00",
    read: true,
    action: "Reorder",
  },
  {
    id: "N004",
    type: "user",
    message: "New user registration from Emma Davis",
    timestamp: "2024-07-15T06:15:00",
    read: true,
    action: "View Profile",
  },
  {
    id: "N005",
    type: "order",
    message: "Order ORD-009 has been shipped",
    timestamp: "2024-07-15T05:00:00",
    read: true,
    action: "Track",
  },
  {
    id: "N006",
    type: "system",
    message: "Daily backup completed successfully",
    timestamp: "2024-07-14T23:00:00",
    read: true,
    action: null,
  },
  {
    id: "N007",
    type: "order",
    message: "Order ORD-008 delivered successfully",
    timestamp: "2024-07-14T14:30:00",
    read: true,
    action: "View",
  },
  {
    id: "N008",
    type: "inventory",
    message: "Sandalwood Dreams stock is running low (5 units)",
    timestamp: "2024-07-14T12:00:00",
    read: true,
    action: "Reorder",
  },
];

export interface AdminMetrics {
  totalSales: string;
  totalOrders: number;
  totalUsers: number;
  revenue: string;
  averageOrderValue: string;
  conversionRate: string;
}

export const mockMetrics: AdminMetrics = {
  totalSales: "$18,540.00",
  totalOrders: 250,
  totalUsers: 1250,
  revenue: "$18,540.00",
  averageOrderValue: "$74.16",
  conversionRate: "3.2%",
};

export interface TopProduct {
  productId: string;
  productName: string;
  sales: number;
  revenue: string;
  rating: number;
}

export const mockTopProducts: TopProduct[] = [
  {
    productId: "1",
    productName: "Midnight Elegance",
    sales: 156,
    revenue: "$19,500",
    rating: 4.8,
  },
  {
    productId: "4",
    productName: "Amber Noir",
    sales: 142,
    revenue: "$17,040",
    rating: 4.9,
  },
  {
    productId: "10",
    productName: "Lavender Serenity",
    sales: 134,
    revenue: "$10,050",
    rating: 4.6,
  },
  {
    productId: "2",
    productName: "Rose Garden",
    sales: 128,
    revenue: "$12,160",
    rating: 4.7,
  },
  {
    productId: "18",
    productName: "Spiced Vanilla",
    sales: 115,
    revenue: "$11,730",
    rating: 4.8,
  },
];

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export const mockSalesData: SalesData[] = [
  { date: "Jul 1", sales: 1200, orders: 12 },
  { date: "Jul 2", sales: 1900, orders: 18 },
  { date: "Jul 3", sales: 1600, orders: 15 },
  { date: "Jul 4", sales: 2100, orders: 22 },
  { date: "Jul 5", sales: 1800, orders: 17 },
  { date: "Jul 6", sales: 2400, orders: 24 },
  { date: "Jul 7", sales: 2200, orders: 20 },
  { date: "Jul 8", sales: 1700, orders: 16 },
  { date: "Jul 9", sales: 2500, orders: 25 },
  { date: "Jul 10", sales: 2100, orders: 21 },
  { date: "Jul 11", sales: 1900, orders: 19 },
  { date: "Jul 12", sales: 2300, orders: 23 },
  { date: "Jul 13", sales: 2000, orders: 20 },
  { date: "Jul 14", sales: 2400, orders: 24 },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRecentOrders(count: number = 5): AdminOrder[] {
  return mockOrders.slice(0, count);
}

export function getRecentUsers(count: number = 5): AdminUser[] {
  return mockUsers.slice(0, count);
}

export function getLowStockItems(): InventoryItem[] {
  return mockInventory.filter((item) => item.status !== "in-stock");
}
