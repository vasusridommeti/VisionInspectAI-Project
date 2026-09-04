import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert("Please enter email, password and select your role");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("visionInspectUser")
    );

    if (savedUser && email !== savedUser.email) {
      alert("Email does not match the registered account");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        ...(savedUser || {}),
        email,
        role,
      })
    );

    if (role === "Quality Engineer") {
      navigate("/quality-dashboard");
    } else if (role === "Factory Supervisor") {
      navigate("/supervisor-dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">Select Role</option>
          <option value="Quality Engineer">Quality Engineer</option>
          <option value="Factory Supervisor">Factory Supervisor</option>
        </select>

        <button
          onClick={handleLogin}
          style={{
            marginTop: "18px",
          }}
        >
          Login
        </button>

        <p
          className="register-link"
          style={{
            marginTop: "25px",
            marginBottom: "0",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;