import { useCart } from '../store';
import { Link } from 'react-router-dom';

export default function Cart() {
  // 1. Get the data from the "Brain"
  const { cart, removeFromCart, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h2>🛍️ Your Shopping Cart</h2>
      
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: "10px", padding: "20px" }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "15px 0" }}>
            
            {/* Image */}
            <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }} />
            
            {/* Details */}
            <div style={{ flex: 1, marginLeft: "20px" }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{item.name}</h3>
              <p style={{ margin: 0, color: "#666" }}>₹{item.price}</p>
            </div>

            {/* Quantity */}
            <div style={{ marginRight: "20px", fontWeight: "bold" }}>
              x {item.quantity}
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => removeFromCart(item.id)}
              style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Total & Checkout */}
        <div style={{ marginTop: "30px", textAlign: "right" }}>
          <h2 style={{ fontSize: "2rem" }}>Total: ₹{total()}</h2>
          
          <button 
            onClick={() => {
              alert("Processing Payment... (Fake)");
              clearCart(); // Empty the cart after buying
            }}
            style={{ background: "black", color: "white", padding: "15px 30px", fontSize: "1.2rem", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }}
          >
            💳 Checkout
          </button>
        </div>
      </div>
    </div>
  );
}