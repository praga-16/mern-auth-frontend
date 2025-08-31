import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      setSuccess("Signup successful! Redirecting...");
      setName(""); setEmail(""); setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <div style={{ maxWidth: "400px", width: "100%", padding: "30px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center" }}>Signup</h2>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {success && <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0" }}/>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0" }}/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%", padding: "10px", margin: "10px 0" }}/>
          <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Signup</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account? <a href="/login" style={{ color: "#4CAF50" }}>Login here</a>
        </p>
      </div>
    </div>
  );
}
