import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form);

    navigate("/");
  };

  return (
    <div className="flex">
      <form className="" onSubmit={handleSubmit}>
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
        <button
          disabled={loading}
          className="p-3 rounded-md shadow-md cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      <p>
        Don't have am account?
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
