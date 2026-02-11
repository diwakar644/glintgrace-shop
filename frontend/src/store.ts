import { create } from 'zustand';

// ==============================
// 1. SHOPPING CART LOGIC
// ==============================
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  clearCart: () => set({ cart: [] }),
  total: () => get().cart.reduce((sum, item) => sum + item.price, 0),
}));

// ==============================
// 2. ADMIN AUTH LOGIC
// ==============================
interface AuthState {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAdmin: false,
  login: () => set({ isAdmin: true }),
  logout: () => set({ isAdmin: false }),
}));