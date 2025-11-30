import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        maxWidth: "220px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "8px",
        }}
      />
      <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>{product.name}</h3>
      <p style={{ fontSize: "14px", margin: "0 0 4px" }}>
        Category: {product.category}
      </p>
      <p style={{ fontWeight: "bold", margin: "0 0 8px" }}>₹{product.price}</p>
      <Link
        to={`/product/${product.id}`}
        style={{
          display: "inline-block",
          padding: "6px 10px",
          backgroundColor: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
