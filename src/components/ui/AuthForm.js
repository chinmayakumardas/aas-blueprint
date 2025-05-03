
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Button from "../actions/Button";

export default function AuthForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // For signup
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login', 'signup', or 'reset'
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Mock behavior for login, signup, and reset password
    setTimeout(() => {
      if (authMode === "login") {
        if (
          formData.email === "it_chinmaya@outlook.com" &&
          formData.password === "admin123"
        ) {
          setIsLoading(false);
          router.push("/dashboard");
        } else {
          setIsLoading(false);
          setError("Invalid credentials");
        }
      } else if (authMode === "signup") {
        if (formData.password === formData.confirmPassword) {
          setIsLoading(false);
          router.push("/dashboard"); // Redirect after successful signup
        } else {
          setIsLoading(false);
          setError("Passwords do not match");
        }
      } else if (authMode === "reset") {
        // Handle reset password logic here
        setIsLoading(false);
        setError("Password reset link sent!");
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg relative">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          {authMode === "login" && "Sign in to your account"}
          {authMode === "signup" && "Create an account"}
          {authMode === "reset" && "Reset your password"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-400 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 top-7 cursor-pointer right-4 flex items-center text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Input (Only for Signup) */}
          {authMode === "signup" && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 top-7 cursor-pointer right-4 flex items-center text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-center text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <Button
            type="submit" variant="primary"
            className="w-full cursor-pointer py-3 px-6 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : authMode === "login" ? "Sign in" : authMode === "signup" ? "Sign up" : "Reset password"}
          </Button>
        </form>

        {/* Toggle Between Modes */}
        <div className="text-center text-gray-400 mt-4">
          {authMode === "login" && (
            <>
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("signup")}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Sign up
                </button>
              </p>
              <p>
                Forgot password?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("reset")}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Reset password
                </button>
              </p>
            </>
          )}

          {authMode === "signup" && (
            <>
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {authMode === "reset" && (
            <>
              <p>
                Remembered your password?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
