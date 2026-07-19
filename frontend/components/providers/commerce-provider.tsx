"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import type { Cart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import {
  ApiError,
  createApiFoundation,
  createCommerceApi,
  createSessionAuthSessionStore,
  createUsersApi,
  type Category,
  type LoginInput,
  type RegisterInput,
  type UserProfile,
} from "@/lib/api";

const session = createSessionAuthSessionStore();
const foundation = createApiFoundation({ session });
const commerceApi = createCommerceApi(foundation.client);
const usersApi = createUsersApi(foundation.client);

type CommerceContextValue = {
  products: Product[];
  categories: Category[];
  catalogLoading: boolean;
  catalogError: string | null;
  user: UserProfile | null;
  sessionLoading: boolean;
  sessionError: string | null;
  cart: Cart;
  cartLoading: boolean;
  cartError: string | null;
  actionProductId: string | null;
  cartActionPending: boolean;
  canDecrementQuantity: false;
  login(input: LoginInput): Promise<void>;
  register(input: RegisterInput): Promise<void>;
  logout(): Promise<void>;
  addToCart(productId: string, quantity?: number): Promise<void>;
  incrementCartItem(productId: string): Promise<void>;
  removeCartItem(productId: string): Promise<void>;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

function messageFrom(error: unknown): string {
  return error instanceof ApiError ? error.message : "Something went wrong. Please try again.";
}

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [actionProductId, setActionProductId] = useState<string | null>(null);
  const cartActionInFlight = useRef(false);

  const loadCart = useCallback(async () => {
    setCartLoading(true);
    setCartError(null);
    try {
      setCart(await commerceApi.getCart());
    } catch (error) {
      setCartError(messageFrom(error));
    } finally {
      setCartLoading(false);
    }
  }, []);

  const loadAuthenticatedState = useCallback(async () => {
    const profile = await usersApi.getProfile();
    setUser(profile);
    await loadCart();
  }, [loadCart]);

  useEffect(() => {
    return session.subscribe(() => {
      if (!session.getRefreshToken()) {
        setUser(null);
        setCart({ items: [] });
        setCartError(null);
      }
    });
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([commerceApi.getProducts(), commerceApi.getCategories()])
      .then(([productData, categoryData]) => {
        if (!active) return;
        setProducts(productData.products);
        setCategories(categoryData);
      })
      .catch((error) => active && setCatalogError(messageFrom(error)))
      .finally(() => active && setCatalogLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      if (!session.getRefreshToken()) {
        if (active) setSessionLoading(false);
        return;
      }
      try {
        await foundation.auth.refresh();
        if (active) await loadAuthenticatedState();
      } catch (error) {
        if (active) setSessionError(messageFrom(error));
      } finally {
        if (active) setSessionLoading(false);
      }
    };
    void restore();
    return () => {
      active = false;
    };
  }, [loadAuthenticatedState]);

  const authenticate = useCallback(
    async (action: () => Promise<unknown>) => {
      setSessionLoading(true);
      setSessionError(null);
      try {
        await action();
        await loadAuthenticatedState();
      } catch (error) {
        setSessionError(messageFrom(error));
        throw error;
      } finally {
        setSessionLoading(false);
      }
    },
    [loadAuthenticatedState],
  );

  const runCartAction = useCallback(
    async (productId: string, action: () => Promise<void>) => {
      if (!user) {
        setCartError("Please sign in to manage your cart.");
        return;
      }
      if (cartActionInFlight.current) return;
      cartActionInFlight.current = true;
      setActionProductId(productId);
      setCartError(null);
      try {
        await action();
        await loadCart();
      } catch (error) {
        setCartError(messageFrom(error));
      } finally {
        cartActionInFlight.current = false;
        setActionProductId(null);
      }
    },
    [loadCart, user],
  );

  const value = useMemo<CommerceContextValue>(
    () => ({
      products,
      categories,
      catalogLoading,
      catalogError,
      user,
      sessionLoading,
      sessionError,
      cart,
      cartLoading,
      cartError,
      actionProductId,
      cartActionPending: actionProductId !== null,
      canDecrementQuantity: false,
      login: (input) => authenticate(() => foundation.auth.login(input)),
      register: (input) => authenticate(() => foundation.auth.register(input)),
      async logout() {
        try {
          await foundation.auth.logout();
        } finally {
          setUser(null);
          setCart({ items: [] });
          setSessionError(null);
        }
      },
      addToCart: (productId, quantity = 1) =>
        runCartAction(productId, () => commerceApi.addCartItem(productId, quantity)),
      incrementCartItem: (productId) =>
        runCartAction(productId, () => commerceApi.addCartItem(productId, 1)),
      removeCartItem: (productId) =>
        runCartAction(productId, () => commerceApi.removeCartItem(productId)),
    }),
    [
      actionProductId,
      authenticate,
      cart,
      cartError,
      cartLoading,
      catalogError,
      catalogLoading,
      categories,
      products,
      runCartAction,
      sessionError,
      sessionLoading,
      user,
    ],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) throw new Error("useCommerce must be used within CommerceProvider");
  return value;
}
