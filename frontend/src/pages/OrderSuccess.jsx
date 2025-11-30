import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Placed Successfully 🎉</h1>
      <p style={{ marginTop: "10px", marginBottom: "10px" }}>
        Thank you for your purchase! Your order has been placed.
      </p>
      <p>
        <strong>Order ID:</strong> {id}
      </p>

      <p style={{ marginTop: "10px" }}>
        A confirmation email has been sent to your registered email address (as
        implemented with Nodemailer in backend).
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/products"
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Continue Shopping
        </Link>

        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
