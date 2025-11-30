const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  size,
  setSize,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
}) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Filters</h3>

      {/* Search */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ marginRight: "8px" }}>Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ padding: "4px 6px", width: "200px" }}
        />
      </div>

      {/* Category */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ marginRight: "8px" }}>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "4px 6px" }}
        >
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Size */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ marginRight: "8px" }}>Size:</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{ padding: "4px 6px" }}
        >
          <option value="">All</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ marginRight: "8px" }}>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: "4px 6px", width: "100px", marginRight: "10px" }}
        />

        <label style={{ marginRight: "8px" }}>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "4px 6px", width: "100px" }}
        />
      </div>

      <button
        onClick={onApply}
        style={{
          padding: "6px 10px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
