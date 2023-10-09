"use server"

import { revalidatePath } from "next/cache"
import user from "@/models/user"
import wallets, { WalletDocument } from "@/models/wallets"
import mongoose, { Error as MongooseError } from "mongoose"
import { getServerSession } from "next-auth"

import dbConnect from "./dbConnect"
import { deleteWalletTransaction } from "./transaction"

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
  const user_wallets = await wallets.find({
    user_id: current_user._id,
    is_deleted: false,
  })
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
  return {
    _id: user_wallet?._id.toString(),
    name: user_wallet?.name,
    initial_balance: user_wallet?.initial_balance,
    current_balance: user_wallet?.current_balance,
    currency: user_wallet?.currency,
  }
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

export async function updateWallet(
  wallet_id: string | mongoose.Types.ObjectId,
  name?: string | null,
  initial_balance?: number | null,
  current_balance?: number | null,
  currency?: string | null
) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const updateData: any = {}
    if (name) {
      updateData.name = name
    }
    if (initial_balance) {
      updateData.initial_balance = initial_balance
    }
    if (current_balance) {
      updateData.current_balance = current_balance
    }
    if (currency) {
      updateData.currency = currency
    }

    const wallet = await wallets.findOneAndUpdate(
      {
        user_id: current_user._id,
        _id: wallet_id,
      },
      updateData
    )
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteWallet(wallet_id: string) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    await deleteWalletTransaction(wallet_id)
    const wallet = await wallets.findByIdAndDelete(wallet_id)
    revalidatePath("/dashboard")
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function checkWalletOwnership(
  wallet_id: string | mongoose.Types.ObjectId,
  user_id: string | mongoose.Types.ObjectId
) {
  try {
    await dbConnect()
    const wallet = await wallets.findOne({ _id: wallet_id, user_id })
    if (!wallet) {
      return false
    }
    return wallet
  } catch (error) {
    console.error(error)
    return false
  }
}
