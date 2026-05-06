"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Users,
  Clock3,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function DashboardPage() {

  const [projects, setProjects] =
    useState<any[]>([])

  const [tasks, setTasks] =
    useState<any[]>([])

  const [user, setUser] =
    useState<any>(null)

  useEffect(() => {

    fetchDashboard()

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const fetchDashboard =
    async () => {

      try {

        const projectsRes =
          await axios.get(
            "/api/projects"
          )

        const tasksRes =
          await axios.get(
            "/api/tasks"
          )

        setProjects(
          projectsRes.data
        )

        setTasks(
          tasksRes.data
        )

      } catch (error) {
        console.log(error)
      }
    }

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "DONE"
    )

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !== "DONE"
    )

  const overdueTasks =
    tasks.filter((task) => {

      if (
        !task.dueDate
      )
        return false

      return (
        new Date(
          task.dueDate
        ) < new Date() &&
        task.status !== "DONE"
      )
    })

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
              className="flex items-center gap-3 bg-violet-600 px-5 py-4 rounded-2xl"
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
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-zinc-900"
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
              Welcome back,{" "}
              {user?.name}
              👋
            </h1>

            <p className="text-zinc-500 text-2xl">
              Here's your productivity overview
            </p>
          </div>

          <div className="px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-lg">
            Role: {user?.role}
          </div>
        </div>

        {/* ROLE */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 mb-10 text-lg">

          {user?.role ===
          "ADMIN"
            ? "Admin can create projects, assign tasks, remove members, and monitor overdue deadlines."
            : "Members can only manage their assigned tasks and track project updates."}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <FolderKanban
              size={34}
            />

            <h1 className="text-6xl font-bold mt-8">
              {
                projects.length
              }
            </h1>

            <p className="text-zinc-500 mt-4 text-xl">
              Total Projects
            </p>

            <p className="text-zinc-400 mt-3">
              5 active client
              projects running
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <CheckCircle
              size={34}
              className="text-green-400"
            />

            <h1 className="text-6xl font-bold mt-8 text-green-400">
              {
                completedTasks.length
              }
            </h1>

            <p className="text-zinc-500 mt-4 text-xl">
              Completed Tasks
            </p>

            <p className="text-zinc-400 mt-3">
              {
                completedTasks.length
              }{" "}
              tasks completed
              successfully
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <Clock3
              size={34}
              className="text-yellow-400"
            />

            <h1 className="text-6xl font-bold mt-8 text-yellow-400">
              {
                pendingTasks.length
              }
            </h1>

            <p className="text-zinc-500 mt-4 text-xl">
              Pending Tasks
            </p>

            <p className="text-zinc-400 mt-3">
              {
                pendingTasks.length
              }{" "}
              tasks currently
              in progress
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <AlertTriangle
              size={34}
              className="text-red-400"
            />

            <h1 className="text-6xl font-bold mt-8 text-red-400">
              {
                overdueTasks.length
              }
            </h1>

            <p className="text-zinc-500 mt-4 text-xl">
              Overdue Tasks
            </p>

            <p className="text-zinc-400 mt-3">
              Delayed tasks
              requiring attention
            </p>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <h1 className="text-6xl font-bold mb-8">
            Recent Activity
          </h1>

          <div className="space-y-5">

            <div className="bg-zinc-800 rounded-2xl p-6 text-lg">
              Project
              "E-Commerce
              Analytics
              System"
              created
              successfully
            </div>

            <div className="bg-zinc-800 rounded-2xl p-6 text-lg">
              Task "Fix
              Production
              Authentication
              Bug" moved to
              IN_PROGRESS
            </div>

            <div className="bg-zinc-800 rounded-2xl p-6 text-lg">
              Task "Build
              Sales Analytics
              Dashboard"
              marked as DONE
            </div>

            <div className="bg-zinc-800 rounded-2xl p-6 text-lg">
              Healthcare
              Appointment
              Portal deadline
              updated
            </div>

            <div className="bg-zinc-800 rounded-2xl p-6 text-lg">
              New member
              added to Team
              Collaboration
              Dashboard
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}