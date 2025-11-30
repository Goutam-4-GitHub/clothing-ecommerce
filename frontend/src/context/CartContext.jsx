import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [isGuestCart, setIsGuestCart] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchCart = async () => {
    try {
      setLoadingCart(true);

      if (user) {
        const res = await api.get("/cart");
        const items = res.data?.CartItems || [];
        setCart(items);
        setIsGuestCart(false);
      } else {
        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(guestCart);
        setIsGuestCart(true);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (product, size, qty) => {
    if (user) {
      await api.post("/cart/add", { productId: product.id, size, qty });
      await fetchCart();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      guestCart.push({
        ...product,
        size,
        qty,
      });
      localStorage.setItem("cart", JSON.stringify(guestCart));
      setCart(guestCart);
      setIsGuestCart(true);
    }
  };

  // itemKey = id for logged-in, index for guest
  const updateQty = async (itemKey, qty) => {
    if (qty < 1) qty = 1;

    if (user && !isGuestCart) {
      try {
        await api.put("/cart/update", { itemId: itemKey, qty });
        await fetchCart();
      } catch (err) {
        console.error("Failed to update cart item:", err);
      }
    } else {
      const guestCart = [...cart];
      if (guestCart[itemKey]) {
        guestCart[itemKey].qty = qty;
        localStorage.setItem("cart", JSON.stringify(guestCart));
        setCart(guestCart);
      }
    }
  };

  const removeItem = async (itemKey) => {
    if (user && !isGuestCart) {
      try {
        await api.delete("/cart/remove", { data: { itemId: itemKey } });
        await fetchCart();
      } catch (err) {
        console.error("Failed to remove cart item:", err);
      }
    } else {
      const guestCart = [...cart];
      guestCart.splice(itemKey, 1);
      localStorage.setItem("cart", JSON.stringify(guestCart));
      setCart(guestCart);
    }
  };

  const clearGuestCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setIsGuestCart(!user);
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isGuestCart,
        loadingCart,
        addToCart,
        fetchCart,
        updateQty,
        removeItem,
        clearGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
