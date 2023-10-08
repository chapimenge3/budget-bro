"use server"

import { revalidatePath } from "next/cache"
import user from "@/models/user"
import wallets from "@/models/wallets"
import mongoose, { Error as MongooseError } from "mongoose"
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

export async function getWallets() {
  const current_user = await getAuthUser()
  if (!current_user) {
    return null
  }
  const user_wallets = await wallets.find({ user_id: current_user._id })
  return user_wallets.map((wallet) => {
    wallet._id = wallet._id.toString()
    return wallet
  })
}

export async function getWallet(id: string) {
  const current_user = await getAuthUser()
  if (!current_user) {
    return null
  }
  const user_wallet = await wallets.findOne({
    user_id: current_user._id,
    _id: id,
  })
  return user_wallet
}

export async function createWallet(
  name: string,
  balance: number,
  currency: string
) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const new_wallet = await wallets.create({
      user_id: current_user._id,
      name: name,
      initial_balance: balance,
      current_balance: balance,
      currency: currency,
    })
    revalidatePath("/dashboard")
    return {
      status: "success",
      message: "Wallet created successfully",
      data: new_wallet,
    }
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (mongooseError: any) => mongooseError.message
      )
      return {
        status: "error",
        message: validationErrors.join(" "),
      }
    } else if (
      error instanceof mongoose.MongooseError &&
      error.message.includes("duplicate key error")
    ) {
      return {
        status: "error",
        message: "A wallet with this name already exists.",
      }
    }

    return {
      status: "error",
      message: "An error occurred while creating the wallet.",
    }
  }
}
