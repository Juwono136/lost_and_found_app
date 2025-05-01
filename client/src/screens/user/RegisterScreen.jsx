// client/src/screens/user/RegisterScreen.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../features/auth/authService";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const payload = {
        binusian_id: form.id,   
        name: form.name,
        email: form.email,
        program: "",
        password: form.password,
        confirmPassword: form.confirmPassword,
      };
      const res = await authService.signup(payload);
      alert(res.message || "Signed up successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Join With Us Now</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">ID</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your identifier"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 underline">
          Please Sign In?
        </Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
