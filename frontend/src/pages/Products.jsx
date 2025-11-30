import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
      };

      if (search) params.search = search;
      if (category && category !== "All") params.category = category;
      if (size) params.size = size;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/products", { params });

      setProducts(res.data.products || []);
      setTotal(res.data.total || 0);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page or filters change
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleApplyFilters = () => {
    setPage(1); // reset to page 1 when filters change
    fetchProducts();
  };

  const goToPrevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const goToNextPage = () => {
    if (page < pages) setPage((p) => p + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "10px" }}>All Products</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        size={size}
        setSize={setSize}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onApply={handleApplyFilters}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
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

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={goToPrevPage}
              disabled={page === 1}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: page === 1 ? "#eee" : "white",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>

            <span>
              Page {page} of {pages} | Total: {total}
            </span>

            <button
              onClick={goToNextPage}
              disabled={page === pages || pages === 0}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor:
                  page === pages || pages === 0 ? "#eee" : "white",
                cursor:
                  page === pages || pages === 0 ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
