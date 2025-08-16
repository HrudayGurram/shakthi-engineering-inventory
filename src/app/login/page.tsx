"use client";

import { useState, useEffect } from "react";
import Text from "@/app/components/subcomponents/Text";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Model from "@/app/components/subcomponents/Model";
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Prefetch dashboard route for faster navigation
  useEffect(() => {
    if (message) {
      router.prefetch('/dashboard');
    }
  }, [message, router]);

  const handleCloseAndNavigate = () => {
    router.push('/dashboard');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id: employeeId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors (e.g., 401, 400, 500)
        setError(data.message || "An unexpected error occurred.");
      } else {
        // Handle successful login
        // You might want to save the user data or a token in local storage here
        // For this example, we just show a success message
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className={`${inter.className} min-h-screen flex bg-gray-100`}>
      {/* Left panel (illustration/background) */}
      <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center">
        <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-inner flex items-center justify-center text-gray-400">
          Image / Illustration
        </div>
      </div>

      {/* Right panel (form) */}
      <div className="flex flex-col flex-1 items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-gray-800 mb-1">Inventory</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome <span className="inline-block">👋</span>
          </h1>
          <p className="text-sm text-gray-500 mb-6">Please login here</p>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <Text
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required={true}
              label="Employee ID"
            />
            <Text
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              label="Password"
            />

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <span>Remember Me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
            >
              Login
            </button>
          </form>

          {/* Status Messages */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
          <Model
            isOpen={!!message}
            onClose={handleCloseAndNavigate}
            title="Logged in Successfully"
            buttonText="Next"
          />
        </div>
      </div>
    </div>
  );
};
