import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';

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

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return <div className="p-10">Loading inventory...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Manager</h1>
          <Link to="/admin/products/new" className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
            <Plus size={20} /> Add Product
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="p-4"><img src={p.image} className="w-12 h-12 object-cover rounded-md border" /></td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-gray-500 text-sm">{p.category}</td>
                  <td className="p-4 font-bold">₹{p.price}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link to={`/admin/products/edit/${p.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded-full"><Edit size={18} /></Link>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="p-10 text-center text-gray-500">No products found.</div>}
        </div>
      </div>
    </div>
  );
};