import { prisma } from "../../../../lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { createToken } from "../../../../lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user =
      await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      })

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      )
    }

    const validPassword =
      await bcrypt.compare(
        body.password,
        user.password
      )

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        {
          status: 401,
        }
      )
    }

    const token = createToken(user.id)

    return NextResponse.json({
      message: "Login successful",
      token,
      user,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    )
  }
}