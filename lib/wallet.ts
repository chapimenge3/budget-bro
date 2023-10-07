'use server'

import wallets from "@/models/wallets"

import dbConnect from "./dbConnect"

export async function createWallet(
  user_id: string,
  name: string,
  initial_balance: number,
  current_balance: number,
  currency: string
) {
  try {
    await dbConnect()
    const wallet = await wallets.create({
      user_id,
      name,
      initial_balance,
      current_balance,
      currency,
    })
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getWallets(user_id: string) {
  try {
    await dbConnect()
    const userWallets = await wallets.find({ user_id })
    return wallets
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getWallet(wallet_id: string) {
  try {
    await dbConnect()
    const wallet = await wallets.findById(wallet_id)
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateWallet(
  wallet_id: string,
  name: string,
  initial_balance: number,
  current_balance: number,
  currency: string
) {
  try {
    await dbConnect()
    const wallet = await wallets.findByIdAndUpdate(wallet_id, {
      name,
      initial_balance,
      current_balance,
      currency,
    })
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteWallet(wallet_id: string) {
  try {
    await dbConnect()
    const wallet = await wallets.findByIdAndDelete(wallet_id)
    return wallet
  } catch (error) {
    console.error(error)
    return null
  }
}
