import { useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const { cart, isGuestCart, clearGuestCart, fetchCart } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate total
  const totalPrice = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((sum, item) => {
      const price = Number(item.price);
      const qty = Number(item.qty);
      return sum + price * qty;
    }, 0);
  }, [cart]);

  // If not logged in, block checkout (extra safety)
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>You must be logged in to place an order.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Go to Products</Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError("");

      // Backend uses DB cart for logged-in user, so no body needed
      const res = await api.post("/orders");

      // Extra: clear guest cart (should be irrelevant if user logged in, but safe)
      if (isGuestCart) {
        clearGuestCart();
      }

      // Refresh cart from backend (it will be empty now)
      await fetchCart();

      // Navigate to Order Success page with order ID
      const orderId = res.data.order.id;
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "10px" }}>Checkout</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Order Summary</h2>
        {cart.map((item, index) => {
          const product = item.Product || item; // logged-in or guest format
          const price = Number(item.price);
          const qty = item.qty;
          const size = item.size;
          const total = price * qty;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <div>
                <strong>{product.name}</strong> ({size}) x {qty}
              </div>
              <div>₹{total}</div>
            </div>
          );
        })}

        <hr />
        <p style={{ fontSize: "18px", marginTop: "8px" }}>
          Total: <strong>₹{totalPrice}</strong>
        </p>
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          padding: "8px 14px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
          marginRight: "10px",
        }}
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>

      <Link to="/cart">Back to Cart</Link>
    </div>
  );
};

export default Checkout;
