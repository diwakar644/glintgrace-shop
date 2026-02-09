import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useCart((state) => state.login); // Get the login function from store
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    try {
      // Ask Backend if password is correct
      const res = await fetch('https://glintgrace-api.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        login(); // Update Global State
        navigate('/admin'); // Redirect to Dashboard
      } else {
        setError("❌ Wrong Password! Try 'admin123'");
      }
    } catch (err) {
      setError("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">🔐 Admin Access</h2>
          <p className="text-sm text-gray-500 mt-2">Restricted area for staff only.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter secure key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}

          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg">
            Unlock Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/')} className="text-sm text-blue-600 hover:underline">
            ← Back to Store
          </button>
        </div>

      </div>
    </div>
  );
}