import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    fetch('https://glintgrace-api.onrender.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* HERO SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          💎 GlintGrace
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Exquisite jewelry for the modern era. Hand-crafted, AI-verified.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((item: any) => (
          <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            
            {/* IMAGE AREA */}
            <div className="relative h-72 overflow-hidden bg-gray-200">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
              />
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                {item.category}
              </span>
            </div>

            {/* DETAILS AREA */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                
                <div className="flex gap-2">
                  {/* TRY ON BUTTON */}
                  <button 
                    onClick={() => navigate('/tryon', { state: { product: item } })}
                    className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-2 rounded-lg text-sm font-semibold transition"
                    title="Virtual Try-On"
                  >
                    ✨ Try On
                  </button>

                  {/* ADD TO CART BUTTON */}
                  <button 
                    onClick={() => { addToCart(item); alert("Added to cart!"); }}
                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition transform active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}