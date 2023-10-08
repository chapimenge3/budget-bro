import Category from "../models/category"
import Label from "../models/label"
import dbConnect from "./dbConnect"

export const transactionType = [
  {
    value: "express",
    label: "Express",
  },
  {
    value: "income",
    label: "Income",
  },
  {
    value: "tranfer",
    label: "Transfer",
  },
]

const categoriesNames = [
  { name: "Food", color: "#FF5733" },
  { name: "Rent", color: "#FFC300" },
  { name: "Utilities", color: "#C70039" },
  { name: "Transportation", color: "#900C3F" },
  { name: "Entertainment", color: "#581845" },
  { name: "Shopping", color: "#2E86C1" },
  { name: "Healthcare", color: "#F4D03F" },
  { name: "Education", color: "#28B463" },
  { name: "Travel", color: "#F39C12" },
  { name: "Groceries", color: "#7D3C98" },
  { name: "Gifts", color: "#D98880" },
  { name: "Hobbies", color: "#00CED1" },
  { name: "Insurance", color: "#5D6D7E" },
  { name: "Savings", color: "#27AE60" },
]

export async function createCategories() {
  await dbConnect()
  for (let i = 0; i < categoriesNames.length; i++) {
    const category = categoriesNames[i]
    await Category.create({
      name: category.name,
      color: category.color,
    })
  }
}

const labelsNames = [
  { name: "Personal", color: "#FF5733" },
  { name: "Work", color: "#3498DB" },
  { name: "Family", color: "#2ECC71" },
  { name: "Health", color: "#E74C3C" },
  { name: "Entertainment", color: "#9B59B6" },
  { name: "Shopping", color: "#F1C40F" },
  { name: "Travel", color: "#E67E22" },
  { name: "Education", color: "#1ABC9C" },
  { name: "Gifts", color: "#E74C3C" },
  { name: "Other", color: "#95A5A6" },
]

export async function createLabels() {
  await dbConnect()
  for (let i = 0; i < labelsNames.length; i++) {
    const label = labelsNames[i]
    await Label.create({
      name: label.name,
    })
  }
}
