import jwt from "jsonwebtoken"

const JWT_SECRET =
  process.env.JWT_SECRET || "secret"

export function createToken(userId: string) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )
}