"use client"

import { useState } from "react"
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"

import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    })

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await axios.post(
        "/api/auth/login",
        formData
      )

      alert("Login successful!")

      // TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      )

      // FULL USER OBJECT
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      )

      // USER ID
      localStorage.setItem(
        "userId",
        response.data.user.id
      )

      router.push("/dashboard")
    } catch (error: any) {
      alert(
        error.response?.data?.error ||
          "Login failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Login Card */}
      <div className="relative z-10 w-[420px] p-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">

          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-xl font-bold">
            F
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              FlowSync
            </h1>

            <p className="text-zinc-400 text-sm">
              Team Task Manager
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-zinc-400">
            Login to continue managing projects
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="text-sm text-zinc-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full h-12 rounded-xl bg-zinc-800 border border-zinc-700 px-4 outline-none focus:border-violet-500 transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm text-zinc-300 block mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full h-12 rounded-xl bg-zinc-800 border border-zinc-700 px-4 pr-12 outline-none focus:border-violet-500 transition"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3.5 text-zinc-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold flex items-center justify-center gap-2"
          >
            {loading
              ? "Logging in..."
              : "Login"}

            <ArrowRight size={18} />
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Don&apos;t have an account?{" "}

          <button
            type="button"
            onClick={() =>
              router.push("/signup")
            }
            className="text-violet-400 hover:text-violet-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}