import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../features/auth/authService";
import tokenService from "../../features/token/tokenService";
import userService from "../../features/user/userService";

export default function LoginScreen() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const navigate                = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      //  Call the signin feature
      const signinData = await authService.signin({ email, password });

      localStorage.setItem("userId", signinData.id);

      // Handle role selection if required
      if (signinData.roleSelectionRequired) {
        navigate("/select-role", {
          state: { roles: signinData.role, userId: signinData.id },
        });
        return;
      }

      // Refresh token to get access token
      const tokenData = await tokenService.refreshToken();
      localStorage.setItem("accessToken", tokenData.access_token);

      // Optionally fetch current user profile
      const currentUser = await userService.getCurrentUser();
      localStorage.setItem("userInfo", JSON.stringify(currentUser));

      // Redirect to homepage
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to sign in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {error && (
          <div className="text-red-600 text-center">{error}</div>
        )}

        <form onSubmit={submitHandler} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md 
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Link
                to="/forgot"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-indigo-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent
                       text-sm font-medium rounded-md text-white ${
                         loading
                           ? "bg-indigo-300"
                           : "bg-indigo-600 hover:bg-indigo-700"
                       }`}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
