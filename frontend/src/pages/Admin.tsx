import { useEffect, useState } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '', price: '', image: '', category: '', description: ''
  });

  // 1. Fetch Products (So we can see what to delete)
  const fetchProducts = () => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle Add (Create)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price) };
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    alert("✅ Added!");
    setFormData({ name: '', price: '', image: '', category: '', description: '' });
    fetchProducts(); // Refresh list
  };

  // 3. Handle Delete (Remove)
  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure you want to delete this?")) return;
    
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });
    fetchProducts(); // Refresh list immediately
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      
      {/* SECTION 1: UPLOAD FORM */}
      <div style={{ background: "#f9f9f9", padding: "30px", borderRadius: "10px", marginBottom: "40px" }}>
        <h2>➕ Add New Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
          <input placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: "10px" }} />
          <input placeholder="Price" type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: "10px" }} />
          <input placeholder="Image URL" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ padding: "10px" }} />
          <input placeholder="Category" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: "10px" }} />
          <button type="submit" style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>Upload</button>
        </form>
      </div>

      {/* SECTION 2: PRODUCT LIST */}
      <h2>🗑️ Manage Inventory</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee", textAlign: "left" }}>
            <th style={{ padding: "10px" }}>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item: any) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>
                <img src={item.image} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
              </td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}