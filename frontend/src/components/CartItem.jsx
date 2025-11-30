const CartItem = ({
  item,
  isGuestCart,
  onQtyChange,
  onRemove,
}) => {
  // Normalize structure
  const product = isGuestCart ? item : item.Product;
  const qty = item.qty;
  const size = item.size;
  const price = Number(isGuestCart ? item.price : item.price); // price stored on CartItem
  const total = price * qty;

  if (!product) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px",
        borderBottom: "1px solid #eee",
        alignItems: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 4px" }}>{product.name}</h3>
        <p style={{ margin: "0 0 4px", fontSize: "14px" }}>
          Size: <strong>{size}</strong>
        </p>
        <p style={{ margin: "0 0 4px", fontSize: "14px" }}>
          Price: ₹{price} x {qty} = <strong>₹{total}</strong>
        </p>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label>Qty:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => onQtyChange(Number(e.target.value) || 1)}
            style={{ width: "60px", padding: "4px 6px" }}
          />
          <button
            onClick={onRemove}
            style={{
              padding: "4px 8px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
