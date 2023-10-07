import transactions from "@/models/transactions"

import dbConnect from "./dbConnect"

export async function createTransaction(
  wallet_id: string,
  name: string,
  amount: number,
  currency: string,
  type: string,
  date: Date
) {
  try {
    await dbConnect()
    const transaction = await transactions.create({
      wallet_id,
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

export async function getTransactions(wallet_id: string) {
  try {
    await dbConnect()
    const walletTransactions = await transactions.find({ wallet_id })
    return walletTransactions
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
    await dbConnect()
    const transaction = await transactions.findByIdAndDelete(transaction_id)
    return transaction
  } catch (error) {
    console.error(error)
    return null
  }
}
