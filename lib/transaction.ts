"use server"

import { revalidatePath } from "next/cache"
import transactions, { TransactionDocument } from "@/models/transactions"
import user from "@/models/user"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import dbConnect from "./dbConnect"
import { checkWalletOwnership, updateWallet } from "./wallet"

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

export async function createTransaction(
  wallet_id: string | mongoose.Types.ObjectId,
  category_id: string | mongoose.Types.ObjectId | null,
  label_id: string | mongoose.Types.ObjectId | null,
  note: string | null,
  amount: number,
  type: string
) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return {
        status: "error",
        message: "User not found",
      }
    }
    const checkWallet = await checkWalletOwnership(wallet_id, current_user._id)
    const amountToBePushed = type === "income" ? amount : -amount
    if (!checkWallet) {
      return {
        status: "error",
        message: "Wallet not found",
      }
    }
    if (checkWallet?.current_balance + amountToBePushed < 0) {
      return {
        status: "error",
        message: "Insufficient balance in wallet",
      }
    }
    await transactions.create({
      user_id: current_user._id,
      wallet_id,
      category_id,
      label_id,
      note,
      amount,
      type,
    })
    const walletCurrentBalance = checkWallet?.current_balance + amountToBePushed
    await updateWallet(
      checkWallet._id,
      undefined,
      undefined,
      walletCurrentBalance
    )
    revalidatePath(`/wallet/${wallet_id}`)
    return {
      status: "success",
      message: "Transaction created successfully",
    }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      message: "Something went wrong",
    }
  }
}

export async function getTransactions(wallet_id: string) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const checkWallet = await checkWalletOwnership(wallet_id, current_user._id)
    if (!checkWallet) {
      return null
    }
    const walletTransactions: TransactionDocument[] = await transactions
      .find({
        wallet_id: checkWallet._id,
        user_id: current_user._id,
      })
      .sort({ created_at: -1, amount: -1 })
    // TODO: Add pagination
    // TODO: Add sorting by choosing field
    // TODO: Add filtering using note, date range and amount range
    const transactionList = walletTransactions?.map((transaction) => {
      return {
        _id: transaction._id.toString(),
        note: transaction.note,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.created_at,
        currency: checkWallet.currency,
      }
    })
    return transactionList
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getTransaction(transaction_id: string) {
  try {
    await dbConnect()
    const transaction = await transactions.findById(transaction_id)
    return transaction
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateTransaction(
  transaction_id: string,
  name: string,
  amount: number,
  currency: string,
  type: string,
  date: Date
) {
  try {
    await dbConnect()
    const transaction = await transactions.findByIdAndUpdate(transaction_id, {
      name,
      amount,
      currency,
      type,
      date,
    })
    return transaction
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteTransaction(transaction_id: string) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return {
        status: "error",
        message: "User not found",
      }
    }
    const transaction = await transactions.findOneAndDelete({
      _id: transaction_id,
      user_id: current_user._id,
    })
    revalidatePath(`/wallet/${transaction?.wallet_id}`)
    return {
      status: "success",
      message: "Transaction deleted successfully",
    }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      message: "Something went wrong",
    }
  }
}

export async function combinedTransactionPerDay(dateRange: Date[] | null) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    if (!dateRange) {
      // if date range is not provided, then set it to 31 days
      dateRange = [
        new Date(new Date().getTime() - 1000 * 3600 * 24 * 31),
        new Date(),
      ]
    }
    const numDays = Math.round(
      (dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 3600 * 24)
    )
    // if date range is more than 31 days, then set it to 31 days
    if (numDays > 31) {
      dateRange[0] = new Date(dateRange[1].getTime() - 1000 * 3600 * 24 * 31)
    }
    const walletTransactions: TransactionDocument[] = await transactions
      .find({
        user_id: current_user._id,
        created_at: {
          $gte: dateRange[0],
          $lte: dateRange[1],
        },
      })
      .sort({ created_at: -1 })
    const transactionList = walletTransactions?.map((transaction) => {
      return {
        name: transaction.created_at.toISOString().split("T")[0],
        value: transaction.amount,
      }
    })
    return transactionList
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteWalletTransaction(
  wallet_id: string | mongoose.Types.ObjectId
) {
  try {
    const current_user = await getAuthUser()
    if (!current_user) {
      return null
    }
    const checkWallet = await checkWalletOwnership(wallet_id, current_user._id)
    if (!checkWallet) {
      return null
    }
    await transactions.deleteMany({
      wallet_id: checkWallet._id,
      user_id: current_user._id,
    })
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}
