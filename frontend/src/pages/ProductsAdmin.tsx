import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

// FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      // ✅ FIXED: Changed single quotes to backticks ( ` )
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      // FIX: Hardcoded URL here too
      await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      // Remove from UI immediately
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Manager</h1>
            <p className="text-gray-500">Manage your jewelry inventory</p>
          </div>
          <Link to="/admin/products/new" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
            <Plus size={20} /> Add New Product
          </Link>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md border" />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-500 text-sm">{product.category}</td>
                  <td className="p-4 font-bold">₹{product.price}</td>
                  <td className="p-4 text-right space-x-2">
                    {/* EDIT BUTTON */}
                    <Link to={`/admin/products/edit/${product.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                      <Edit size={18} />
                    </Link>
                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No products found. Click "Add New Product" to start!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};