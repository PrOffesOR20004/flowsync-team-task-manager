"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "MEMBER",
    })

  const handleSignup = async (
    e: any
  ) => {
    e.preventDefault()

    try {
      await axios.post(
        "/api/auth/signup",
        formData
      )

      alert(
        "Account created successfully"
      )

      router.push("/login")
    } catch (error: any) {
      alert(
        error.response?.data?.error ||
          "Signup failed"
      )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <form
        onSubmit={handleSignup}
        className="w-[420px] p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5"
      >
        <h1 className="text-4xl font-bold">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full h-12 px-4 rounded-xl bg-zinc-800"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full h-12 px-4 rounded-xl bg-zinc-800"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password:
                e.target.value,
            })
          }
          className="w-full h-12 px-4 rounded-xl bg-zinc-800"
          required
        />

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          className="w-full h-12 px-4 rounded-xl bg-zinc-800"
        >
          <option value="MEMBER">
            MEMBER
          </option>

          <option value="ADMIN">
            ADMIN
          </option>
        </select>

        <button className="w-full h-12 rounded-xl bg-violet-600">
          Create Account
        </button>
      </form>
    </div>
  )
}