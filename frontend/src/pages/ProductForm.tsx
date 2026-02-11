import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Earrings',
    image: '',
    description: ''
  });

  // 1. FETCH EXISTING DATA
  useEffect(() => {
    if (isEditing) {
      // Use backticks and the correct env variable
      fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then(data => {
          setFormData({
            name: data.name,
            price: data.price,
            category: data.category || 'Earrings',
            image: data.image,
            description: data.description || ''
          });
          setFetching(false);
        })
        .catch(err => {
          console.error(err);
          alert("Failed to load product details");
          navigate('/admin/products');
        });
    }
  }, [id, isEditing, navigate]);

  // 2. HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // FIXED: Removed the extra "/products" from the end
    const url = isEditing 
      ? `${import.meta.env.VITE_API_URL}/products/${id}` 
      : `${import.meta.env.VITE_API_URL}/products`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        navigate('/admin/products');
      } else {
        const errorData = await res.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading product details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input required type="number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none bg-white"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Earrings">Earrings</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Rings">Rings</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Sets">Sets</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input required type="url" placeholder="https://..." className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-md border" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={4} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};