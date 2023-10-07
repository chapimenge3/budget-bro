'use server'

import Category from "@/models/category"

import dbConnect from "./dbConnect"

export async function createCategory(
  user_id: string | null,
  name: string,
  color: string | null,
  icon: string | null
) {
  try {
    await dbConnect()
    const category = await Category.create({
      user_id,
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

export async function getCategories(user_id: string) {
  try {
    await dbConnect()
    const userCategories = await Category.find({
      $or: [{ user_id }, { user_id: null }],
    })
    return userCategories
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
