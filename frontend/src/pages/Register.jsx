import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword || !role) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      email: email,
      role: role,
      department: "Manufacturing",
      joined: new Date().toLocaleDateString("en-GB"),
    };

    localStorage.setItem("visionInspectUser", JSON.stringify(user));

    if (role === "Quality Engineer") {
      navigate("/quality-dashboard");
    } else if (role === "Factory Supervisor") {
      navigate("/supervisor-dashboard");
    }
  };

  return (
    <div className="login-card">
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option>Quality Engineer</option>
        <option>Factory Supervisor</option>
      </select>

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;