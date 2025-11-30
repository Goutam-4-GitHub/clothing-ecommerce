import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/"); // go to home after register
    } catch (err) {
      console.error(err);
      setError("Failed to register. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "320px", marginTop: "20px" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "6px 8px" }}
            placeholder="Enter your name"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "6px 8px" }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "6px 8px" }}
            placeholder="Create a password"
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 14px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <span style={{ fontSize: "14px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
