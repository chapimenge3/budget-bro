"use server"

import Label from "@/models/label"
import user from "@/models/user"
import { getServerSession } from "next-auth"

import dbConnect from "./dbConnect"

const getAuthUser = async () => {
  const session = await getServerSession()
  if (!session) {
    return null
  }
  await dbConnect()
  const current_user = await user.findOne({ email: session.user?.email })
  if (!current_user) {
    return null
  }
  return current_user
}

export async function getLabels() {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const userLabels = await Label.find({
      $or: [{ user_id: current_user._id }, { user_id: null }],
    })
    return userLabels.map((label) => ({
      _id: label._id.toString(),
      name: label.name,
    }))
  } catch (error) {
    console.error(error)
    return null
  }
}
