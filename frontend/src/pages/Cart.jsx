import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart, isGuestCart, loadingCart, updateQty, removeItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((sum, item) => {
      const price = Number(item.price);
      const qty = Number(item.qty);
      return sum + price * qty;
    }, 0);
  }, [cart]);

  const handleProceedToCheckout = () => {
  if (!user) {
    navigate("/login");
    return;
  }
  navigate("/checkout");
};


  if (loadingCart) {
    return <p style={{ padding: "20px" }}>Loading cart...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "10px" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products">Go to Products</Link>
        </div>
      ) : (
        <>
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            {cart.map((item, index) => {
              const key = isGuestCart ? index : item.id;
              const itemKey = isGuestCart ? index : item.id;

              return (
                <CartItem
                  key={key}
                  item={item}
                  isGuestCart={isGuestCart}
                  onQtyChange={(newQty) => updateQty(itemKey, newQty)}
                  onRemove={() => removeItem(itemKey)}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "18px" }}>
              Total: <strong>₹{totalPrice}</strong>
            </p>
            <button
              onClick={handleProceedToCheckout}
              style={{
                padding: "8px 14px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>

          {!user && (
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              You are using a guest cart. You can still checkout, but cart will
              not be stored on server until you log in.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
