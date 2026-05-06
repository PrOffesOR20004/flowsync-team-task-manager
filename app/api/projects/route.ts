import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const projects =
      await prisma.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const project =
      await prisma.project.create({
        data: {
          title: body.title,
          description:
            body.description,
        },
      })

    return NextResponse.json(project)
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      {
        status: 500,
      }
    )
  }
}