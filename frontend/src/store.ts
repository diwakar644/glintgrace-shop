import { create } from 'zustand';

// Cart Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Store Interface
interface AppStore {
  // Cart State
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: () => number;

  // Auth State (NEW)
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

export const useCart = create<AppStore>((set, get) => ({
  // --- CART LOGIC ---
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
  total: () => get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),

  // --- AUTH LOGIC (NEW) ---
  isAdmin: false,
  login: () => set({ isAdmin: true }),
  logout: () => set({ isAdmin: false })
}));