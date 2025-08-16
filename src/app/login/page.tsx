"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Text from "@/app/components/subcomponents/Text";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Model from "@/app/components/subcomponents/Model";
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  // 🚀 OPTIMIZATION: Prefetch the dashboard route as soon as the modal is set to open.
  useEffect(() => {
    if (message) {
      router.prefetch('/dashboard');
    }
  }, [message, router]);

  // This function will handle the actual navigation.
  const handleCloseAndNavigate = () => {
    router.push('/dashboard');
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Login successful!");
    }
  };

  return (
    <div className={`${inter.className} min-h-screen flex bg-gray-100`}>
      {/* Left panel (illustration/background) */}
      {/* Left side */}
      <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center">
        {/* You can replace with your illustration */}
        <div className="w-3/4 h-3/4 bg-white rounded-xl shadow-inner flex items-center justify-center text-gray-400">
          Image / Illustration
        </div>
      </div>

      {/* Right panel (form) */}
      <div className="flex flex-col flex-1 items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            {/* <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            /> */}
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              label="Email Address"
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
}
