import { BrowserRouter, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { useCart } from './store';
import Admin from './admin/Admin';
import {
  Dashboard,
  Products,
  Orders,
  Customers,
  Settings,
} from "./admin/pages";

import type { JSX } from 'react';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = useCart((state) => state.isAdmin);
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  const { cart, isAdmin, logout } = useCart();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
              <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <Link
                      to="/"
                      className="text-2xl font-bold tracking-tight hover:opacity-80 transition"
                    >
                      💎 GlintGrace
                    </Link>
                    <div className="flex items-center gap-6">
                      <Link
                        to="/"
                        className="text-sm font-medium hover:text-blue-600 transition"
                      >
                        Store
                      </Link>
                      {isAdmin ? (
                        <button
                          onClick={logout}
                          className="text-sm font-bold text-red-600 hover:text-red-800 transition"
                        >
                          Logout
                        </button>
                      ) : (
                        <a
                          href="/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-blue-600 transition"
                        >
                          Admin Login
                        </a>
                      )}
                      <Link to="/cart" className="relative group">
                        <span className="text-2xl">🛒</span>
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;