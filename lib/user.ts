'use server'
import User from "@/models/user"

import dbConnect from "./dbConnect"

export async function createUser(name: string, email: string) {
  try {
    await dbConnect()
    const user = await User.create({
      name,
      email,
      is_verified: true,
    })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getUserByEmail(email: string | null | undefined) {
  try {
    if (!email) return null
    await dbConnect()
    const user = await User.findOne({ email })
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
