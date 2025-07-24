import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../features/auth/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  // Clear field error when user types
  useEffect(() => {
    if (fieldError) setFieldError("");
  }, [email, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Alert notification for blank fields
    if (!email.trim() || !password.trim()) {
      setFieldError("Please fill in all fields");
      return;
    }

    try {
      const result = await dispatch(signIn({ email, password })).unwrap();

      if (result.roleSelectionRequired) {
        navigate("/select-role", {
          state: { roles: result.role, userId: result.id },
        });
      } else {
        navigate("/home");
      }
    } catch {
      // error from auth slice shown below
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {/* Inline alert for field errors */}
        {fieldError && (
          <div className="mb-4 text-red-600 text-center">{fieldError}</div>
        )}

        {/* Error from auth API */}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded ${
              loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>

          <div className="text-center">
            <Link to="/forgot" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
