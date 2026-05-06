"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

import {
  FolderKanban,
  CalendarDays,
  X,
  LayoutDashboard,
  CheckCircle2,
  Users,
  LogOut,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description?: string
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] =
    useState(false)

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    })

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("user") || "{}"
        )
      : null

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "/api/projects"
      )

      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const createProject = async () => {
    try {
      setLoading(true)

      await axios.post("/api/projects", {
        title: formData.title,
        description: formData.description,
        ownerId: user?.id,
      })

      alert("Project created successfully!")

      setOpen(false)

      setFormData({
        title: "",
        description: "",
      })

      fetchProjects()
    } catch (error) {
      console.log(error)

      alert("Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <aside className="w-[260px] border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-lg">
              F
            </div>

            <div>
              <h1 className="text-xl font-bold">
                FlowSync
              </h1>

              <p className="text-zinc-400 text-sm">
                Team Task Manager
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">

            <Link href="/dashboard">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link href="/projects">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-600 cursor-pointer">
                <FolderKanban size={20} />
                <span>Projects</span>
              </div>
            </Link>

            <Link href="/tasks">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                <CheckCircle2 size={20} />
                <span>Tasks</span>
              </div>
            </Link>

            <Link href="/team">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 transition cursor-pointer">
                <Users size={20} />
                <span>Team</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear()
            window.location.href = "/login"
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-bold mb-2">
              Projects
            </h1>

            <p className="text-zinc-400 text-lg">
              Manage all your team projects
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-6 h-14 rounded-2xl bg-violet-600 hover:bg-violet-500 transition text-lg font-medium"
          >
            + Create Project
          </button>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 hover:border-violet-500 transition"
            >

              <div className="w-16 h-16 rounded-2xl bg-violet-600/20 flex items-center justify-center mb-6">
                <FolderKanban size={30} />
              </div>

              <h2 className="text-3xl font-bold mb-4">
                {project.title}
              </h2>

              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-zinc-500">
                <CalendarDays size={18} />

                <span>
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="w-[500px] rounded-3xl bg-zinc-900 border border-zinc-800 p-8">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold">
                  Create Project
                </h2>

                <button
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </div>

              <div className="space-y-5">

                <input
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl bg-zinc-800 px-5 outline-none"
                />

                <textarea
                  placeholder="Project Description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-2xl bg-zinc-800 p-5 outline-none"
                />

                <button
                  onClick={createProject}
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-500 transition text-lg font-medium"
                >
                  {loading
                    ? "Creating..."
                    : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}