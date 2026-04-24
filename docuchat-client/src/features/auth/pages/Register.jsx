import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate("/");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(form);

      navigate("/login");
    } catch (error) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => handleChange(e)}
        />
        <button disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
