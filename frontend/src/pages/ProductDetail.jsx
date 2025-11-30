import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);

      // If product has sizes array, set default size
      if (Array.isArray(res.data.sizes) && res.data.sizes.length > 0) {
        setSize(res.data.sizes[0]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setMessage("");

    if (!size) {
      setMessage("Please select a size.");
      return;
    }

    try {
      await addToCart(product, size, qty);
      setMessage("Added to cart!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add to cart. Please try again.");
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading product...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "300px",
          height: "350px",
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />

      {/* Details */}
      <div>
        <h1 style={{ marginBottom: "10px" }}>{product.name}</h1>
        <p style={{ marginBottom: "8px" }}>{product.description}</p>
        <p style={{ marginBottom: "8px" }}>
          <strong>Category:</strong> {product.category}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>In Stock:</strong> {product.stock}
        </p>

        {/* Size selection */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "8px" }}>Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            style={{ padding: "4px 6px" }}
          >
            {Array.isArray(product.sizes) &&
              product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </div>

        {/* Quantity */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "8px" }}>Quantity:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value) || 1)}
            style={{ padding: "4px 6px", width: "60px" }}
          />
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            padding: "8px 14px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        {message && (
          <p style={{ marginTop: "10px", color: message.includes("Added") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
