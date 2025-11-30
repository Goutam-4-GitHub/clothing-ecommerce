import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch first page with 8 products
      const res = await api.get("/products", {
        params: { page: 1, limit: 8 },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading products...</p>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <p>{error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "10px" }}>Welcome to Clothing Store</h1>
      <p style={{ marginBottom: "20px" }}>
        Browse our latest collection of clothing.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      <Link
        to="/products"
        style={{
          display: "inline-block",
          padding: "8px 14px",
          backgroundColor: "#16a34a",
          color: "white",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        View All Products
      </Link>
    </div>
  );
};

export default Home;
