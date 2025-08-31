import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode.default(token);
      setUserName(decoded.name);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        <h2>Dashboard</h2>
        <p>Welcome, <strong>{userName}</strong>!</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
