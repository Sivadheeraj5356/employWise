import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 style={{ marginBottom: "1.5rem", color: "var(--text-primary)", textAlign: "center" }}>Welcome Back</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-lg pl-2">
            email : eve.holt@reqres.in
           <div>
           password : cityslicka
            </div> 
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button" style={{ marginTop: "1rem" }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
