import Link from "next/link"
import { WalletDocument } from "@/models/wallets"
import { getServerSession } from "next-auth"
import { getWallets } from "@/lib/wallet"
import AddWallet from "@/components/AddWallet"
import Wallet from "@/components/Wallet"
import { Transaction } from "@/components/transaction"
import { combinedTransactionPerDay } from "@/lib/transaction"
import { createLabels } from "@/lib/constants"


export default async function AuthenticatedLanding() {
  const session = await getServerSession()
  if (!session) {
    return <div>Not Authenticated</div>
  }
  const walletData: WalletDocument[] | null = await getWallets()
  console.log('walletData', walletData)
  const combinedTransaction = await combinedTransactionPerDay(null)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {walletData && walletData.map((wallet) => (
          <Wallet
            key={wallet._id.toString()}
            id={wallet._id.toString()}
            name={wallet.name}
            amount={wallet.current_balance}
            currency={wallet.currency}
            initial_balance={wallet.initial_balance}
            showButton={true}
          />
        ))}
        {
          !walletData || walletData.length == 0 &&
          <div className="col-span-full">
            <h2 className="text-center text-2xl font-bold">No Wallets Found</h2>
            <p className="text-center text-gray-500">Please create a wallet</p>
          </div>
        }
      </div>
      <div className="">
        <AddWallet />
      </div>
      {
        combinedTransaction && combinedTransaction.length > 0 &&
        <Transaction data={combinedTransaction || []} />
      }
      {
        !combinedTransaction || combinedTransaction.length == 0 &&
        <div className="col-span-full">
          <h2 className="text-center text-2xl font-bold">No Transactions Found</h2>
          <p className="text-center text-gray-500">Please add a transaction</p>
        </div>
      }
    </section>
  )
}
