import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

// IMPORTS
import Shop from './pages/Shop';
import { Login } from './pages/Login';
import Cart from './pages/Cart';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductsAdmin } from './pages/ProductsAdmin';
import { ProductForm } from './pages/ProductForm';
import { useCart, useAuthStore } from './store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = useAuthStore((state: any) => state.isAdmin);
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  const cart = useCart((state: any) => state.cart);
  const { isAdmin, login, logout } = useAuthStore((state: any) => state);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // --- CONFIGURATION ---
  const ADMIN_EMAILS = ["admin@glintgrace.com", "diwakar644@gmail.com"]; 

  // --- LOGOUT ---
  const handleLogout = async () => {
    await signOut(auth);
    logout();
    window.location.href = '/';
  };

  const checkAuth = () => {
    auth.currentUser?.reload().then(() => {
        const user = auth.currentUser;
        if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
            login();
        } else {
            if (isAdmin) handleLogout();
        }
    }).catch(() => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        login(); 
      } else {
        logout();
      }
      setIsAuthChecking(false);
    });

    const handleFocus = () => { checkAuth(); };
    window.addEventListener("focus", handleFocus);
    return () => {
        unsubscribe();
        window.removeEventListener("focus", handleFocus);
    };
  }, []);

  if (isAuthChecking) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        
        {/* NAV BAR */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-80">
                💎 GlintGrace
              </Link>

              <div className="flex items-center gap-6">
                <Link to="/" className="text-sm font-medium hover:text-blue-600">Store</Link>
                <Link to="/cart" className="relative group">
                  <span className="text-2xl">🛒</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {isAdmin ? (
                  <div className="flex items-center gap-4">
                    <Link to="/admin" className="text-sm font-bold text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
                      Admin Dashboard
                    </Link>
                    <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-800 transition">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black transition">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          
          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

          {/* PRODUCT ROUTES */}
          <Route path="/admin/products" element={<ProtectedRoute><ProductsAdmin /></ProtectedRoute>} />
          <Route path="/admin/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;