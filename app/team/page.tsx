"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Users,
  Trash2,
  UserPlus,
} from "lucide-react"

export default function TeamPage() {

  const [members, setMembers] =
    useState<any[]>([])

  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {

    fetchMembers()

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      )
    }

  }, [])

  const fetchMembers =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/users"
          )

        setMembers(
          res.data
        )

      } catch (error) {
        console.log(error)
      }
    }

  const removeMember =
    (id: string) => {

      if (
        user?.role !==
        "ADMIN"
      ) {
        alert(
          "Only admin can remove members"
        )

        return
      }

      const filtered =
        members.filter(
          (member) =>
            member.id !== id
        )

      setMembers(filtered)

      alert(
        "Member removed successfully"
      )
    }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-[260px] border-r border-zinc-800 bg-zinc-950 p-6">

        <div>

          <div className="mb-12">

            <h1 className="text-5xl font-bold">
              FlowSync
            </h1>

            <p className="text-zinc-500 mt-2">
              Team Task Manager
            </p>
          </div>

          <div className="space-y-4">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-zinc-900"
            >
              <LayoutDashboard />
              Dashboard
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-zinc-900"
            >
              <FolderKanban />
              Projects
            </Link>

            <Link
              href="/tasks"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-zinc-900"
            >
              <CheckCircle2 />
              Tasks
            </Link>

            <Link
              href="/team"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-violet-600"
            >
              <Users />
              Team
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-7xl font-bold mb-3">
              Team Members
            </h1>

            <p className="text-zinc-500 text-2xl">
              Manage your
              project team
            </p>
          </div>

          <div className="px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg">
            Role: {user?.role}
          </div>
        </div>

        {/* ADMIN CONTROLS */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 mb-10">

          <h2 className="text-5xl font-bold mb-4">
            Admin Controls
          </h2>

          <p className="text-zinc-400 text-lg mb-8">
            Admin can manage
            team members,
            assign tasks,
            monitor project
            deadlines, and
            control workflow.
          </p>

          <div className="flex gap-4 flex-wrap">

            <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-violet-600">
              <UserPlus />
              Add Member
            </button>

            <button
              className={`px-6 py-4 rounded-2xl ${
                user?.role ===
                "ADMIN"
                  ? "bg-red-500"
                  : "bg-zinc-700 cursor-not-allowed"
              }`}
            >
              <Trash2 className="inline mr-2" />
              Remove Member
            </button>
          </div>

          {user?.role !==
            "ADMIN" && (
            <p className="text-red-400 mt-5">
              Member accounts
              cannot manage
              or remove team
              members.
            </p>
          )}
        </div>

        {/* MEMBERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {members.map(
            (member) => (
              <div
                key={
                  member.id
                }
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
              >

                <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center text-4xl font-bold mb-6">
                  {member.name
                    .charAt(0)}
                </div>

                <h2 className="text-6xl font-bold mb-4">
                  {
                    member.name
                  }
                </h2>

                <div className="inline-block px-5 py-2 rounded-2xl bg-violet-600/20 text-violet-300 font-semibold mb-5">
                  {
                    member.role
                  }
                </div>

                <p className="text-zinc-500 text-lg mb-8">
                  {
                    member.email
                  }
                </p>

                {/* ONLY ADMIN */}
                {user?.role ===
                  "ADMIN" && (
                  <div className="flex gap-4">

                    <button className="px-5 py-3 rounded-2xl bg-zinc-800">
                      Assign
                      Task
                    </button>

                    <button
                      onClick={() =>
                        removeMember(
                          member.id
                        )
                      }
                      className="px-5 py-3 rounded-2xl bg-red-500/20 text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  )
}