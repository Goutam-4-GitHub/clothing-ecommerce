import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ marginRight: "15px", fontWeight: "bold", fontSize: "18px" }}
        >
          Clothing Store
        </Link>
        <Link to="/products" style={{ marginRight: "10px" }}>
          Products
        </Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px", fontSize: "14px" }}>
              Hello, <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 10px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
