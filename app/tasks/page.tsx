"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Users,
  Plus,
  CalendarDays,
  AlertTriangle,
  Clock3,
  CheckCircle,
  LogOut,
  X,
} from "lucide-react"

export default function TasksPage() {

  const [tasks, setTasks] =
    useState<any[]>([])

  const [projects, setProjects] =
    useState<any[]>([])

  const [user, setUser] =
    useState<any>(null)

  const [showModal, setShowModal] =
    useState(false)

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [priority, setPriority] =
    useState("HIGH")

  const [status, setStatus] =
    useState("TODO")

  const [projectId, setProjectId] =
    useState("")

  const [startDate, setStartDate] =
    useState("")

  const [dueDate, setDueDate] =
    useState("")

  useEffect(() => {

    fetchTasks()
    fetchProjects()

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const fetchTasks = async () => {

    try {

      const res =
        await axios.get("/api/tasks")

      setTasks(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  const fetchProjects = async () => {

    try {

      const res =
        await axios.get("/api/projects")

      setProjects(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async () => {

    if (
      !title ||
      !description ||
      !projectId ||
      !startDate ||
      !dueDate
    ) {
      alert("Please fill all fields")
      return
    }

    try {

      await axios.post(
        "/api/tasks",
        {
          title,
          description,
          priority,
          status,
          projectId,
          startDate,
          dueDate,
        }
      )

      setShowModal(false)

      setTitle("")
      setDescription("")
      setPriority("HIGH")
      setStatus("TODO")
      setProjectId("")
      setStartDate("")
      setDueDate("")

      fetchTasks()

    } catch (error) {
      console.log(error)
    }
  }

  const getTaskStatus = (
    task: any
  ) => {

    if (!task.dueDate)
      return task.status

    const today =
      new Date()

    const due =
      new Date(task.dueDate)

    today.setHours(0,0,0,0)
    due.setHours(0,0,0,0)

    if (
      due < today &&
      task.status !== "DONE"
    ) {
      return "OVERDUE"
    }

    return task.status
  }

  const getStatusColor = (
    status: string
  ) => {

    if (status === "DONE")
      return "bg-green-500/20 text-green-400"

    if (status === "IN_PROGRESS")
      return "bg-yellow-500/20 text-yellow-400"

    if (status === "OVERDUE")
      return "bg-red-500/20 text-red-400"

    return "bg-zinc-800 text-zinc-300"
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-[260px] border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-10">

            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold">
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

          <nav className="space-y-3">

            <Link href="/dashboard">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800">
                <LayoutDashboard size={20} />
                Dashboard
              </div>
            </Link>

            <Link href="/projects">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800">
                <FolderKanban size={20} />
                Projects
              </div>
            </Link>

            <Link href="/tasks">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-600">
                <CheckCircle2 size={20} />
                Tasks
              </div>
            </Link>

            <Link href="/team">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800">
                <Users size={20} />
                Team
              </div>
            </Link>
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.clear()
            window.location.href =
              "/login"
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-6xl font-bold mb-3">
              Tasks
            </h1>

            <p className="text-zinc-500 text-2xl">
              Manage project tasks, deadlines and progress
            </p>
          </div>

          {user?.role === "ADMIN" && (
            <button
              onClick={() =>
                setShowModal(true)
              }
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500"
            >
              <Plus size={20} />
              Create Task
            </button>
          )}
        </div>

        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 mb-10 text-lg">

          {user?.role === "ADMIN"
            ? "Admin can create tasks, assign work, update deadlines and monitor overdue tasks."
            : "Members can only view and update assigned tasks."}
        </div>

        <div className="grid grid-cols-1 gap-8">

          {tasks.map((task) => {

            const finalStatus =
              getTaskStatus(task)

            return (

              <div
                key={task.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 flex justify-between items-start"
              >

                <div>

                  <h2 className="text-4xl font-bold mb-4">
                    {task.title}
                  </h2>

                  <p className="text-zinc-400 text-lg mb-6 max-w-3xl">
                    {task.description}
                  </p>

                  <div className="space-y-3 text-zinc-400">

                    <p>
                      <span className="text-white font-semibold">
                        Project:
                      </span>{" "}
                      {task.project?.title}
                    </p>

                    <p>
                      <span className="text-white font-semibold">
                        Priority:
                      </span>{" "}
                      {task.priority}
                    </p>

                    <p className="flex items-center gap-2">
  <CalendarDays size={16} />

  <span className="text-white font-semibold">
    Start:
  </span>

  {task.startDate
    ? new Date(
        task.startDate
      ).toLocaleDateString()
    : "Not Set"}
</p>

<p className="flex items-center gap-2">
  <CalendarDays size={16} />

  <span className="text-white font-semibold">
    Deadline:
  </span>

  {task.dueDate
    ? new Date(
        task.dueDate
      ).toLocaleDateString()
    : "Not Set"}
</p>

                    <p className="text-sm text-zinc-500">
                      {finalStatus === "DONE" &&
                        "Task completed successfully."}

                      {finalStatus === "IN_PROGRESS" &&
                        "Task currently in progress."}

                      {finalStatus === "TODO" &&
                        "Task yet to be started."}

                      {finalStatus === "OVERDUE" &&
                        "Deadline crossed. Immediate action required."}
                    </p>

                  </div>
                </div>

                <div>

                  <div
                    className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 ${getStatusColor(
                      finalStatus
                    )}`}
                  >

                    {finalStatus ===
                      "DONE" && (
                      <CheckCircle size={18} />
                    )}

                    {finalStatus ===
                      "IN_PROGRESS" && (
                      <Clock3 size={18} />
                    )}

                    {finalStatus ===
                      "OVERDUE" && (
                      <AlertTriangle size={18} />
                    )}

                    {finalStatus}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">

          <div className="w-full max-w-2xl rounded-3xl bg-zinc-900 border border-zinc-800 p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-4xl font-bold">
                Create Task
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-zinc-400 hover:text-white"
              >
                <X size={30} />
              </button>
            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full h-14 rounded-2xl bg-zinc-800 px-5 outline-none"
              />

              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full h-28 rounded-2xl bg-zinc-800 p-5 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value
                    )
                  }
                  className="h-14 rounded-2xl bg-zinc-800 px-5 outline-none"
                >
                  <option>
                    HIGH
                  </option>

                  <option>
                    MEDIUM
                  </option>

                  <option>
                    LOW
                  </option>
                </select>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="h-14 rounded-2xl bg-zinc-800 px-5 outline-none"
                >
                  <option value="TODO">
                    TODO
                  </option>

                  <option value="IN_PROGRESS">
                    IN_PROGRESS
                  </option>

                  <option value="DONE">
                    DONE
                  </option>
                </select>

              </div>

              <select
                value={projectId}
                onChange={(e) =>
                  setProjectId(
                    e.target.value
                  )
                }
                className="w-full h-14 rounded-2xl bg-zinc-800 px-5 outline-none"
              >
                <option value="">
                  Select Project
                </option>

                {projects.map(
                  (project) => (
                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.title}
                    </option>
                  )
                )}
              </select>

              {/* DATES IN ONE ROW */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block mb-2 text-sm text-zinc-400">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl bg-zinc-800 px-4 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-zinc-400">
                    Deadline
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(
                        e.target.value
                      )
                    }
                    className="w-full h-14 rounded-2xl bg-zinc-800 px-4 outline-none"
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="h-14 rounded-2xl border border-zinc-700 hover:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  onClick={createTask}
                  className="h-14 rounded-2xl bg-violet-600 hover:bg-violet-500 font-semibold"
                >
                  Create Task
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}