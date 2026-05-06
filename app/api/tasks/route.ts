import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {

  try {

    const tasks = await prisma.task.findMany({
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(tasks)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const {
      title,
      description,
      priority,
      status,
      projectId,
      startDate,
      dueDate,
    } = body

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        projectId,

        startDate: new Date(startDate),

        dueDate: new Date(dueDate),
      },
    })

    return NextResponse.json(task)

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}