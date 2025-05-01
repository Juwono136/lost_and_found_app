// src/screens/user/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../features/auth/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await authService.forgotPassword({ email });
      // your API responds with { message: "Check your inbox..." }
      setMessage(res.message || "Check your inbox for reset instructions.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
      <p className="mb-4 text-gray-600">
        Enter your email and we’ll send you a reset link.
      </p>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {message && <div className="mb-4 text-green-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Your Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Verify my email"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-indigo-600 hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
