"use server"

import Category from "@/models/category"
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

export async function createCategory(
  name: string,
  color: string | null,
  icon: string | null
) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return {
        status: "error",
        message: "User not found",
      }
    }
    const category = await Category.create({
      user_id: current_user._id.toString(),
      name,
      color,
      icon,
    })
    return category
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getCategories() {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const userCategories = await Category.find({
      $or: [{ user_id: current_user._id }, { user_id: null }],
    })
    return userCategories.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      color: category.color,
      icon: category.icon,
    }))
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getCategory(category_id: string) {
  try {
    await dbConnect()
    const category = await Category.findById(category_id)
    return category
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateCategory(
  category_id: string,
  name: string,
  color: string | null,
  icon: string | null
) {
  try {
    await dbConnect()
    const category = await Category.findByIdAndUpdate(category_id, {
      name,
      color,
      icon,
    })
    return category
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteCategory(category_id: string) {
  try {
    await dbConnect()
    const category = await Category.findByIdAndDelete(category_id)
    return category
  } catch (error) {
    console.error(error)
    return null
  }
}
