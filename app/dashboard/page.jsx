import { getServerSession } from "next-auth"

import { WalletType } from "@/types/wallet"
import { getWallets } from "@/lib/actions"
import { getUserByEmail } from "@/lib/user"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import AddWallet from "@/components/AddWallet"
import Wallet from "@/components/Wallet"
import { Transaction } from "@/components/transaction"

export default async function AuthenticatedLanding() {
  const session = await getServerSession()
  if (!session) {
    return <div>Not Authenticated</div>
  }
  const user = await getUserByEmail(session.user?.email)

  const walletData = await getWallets(user.id)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {walletData.map((wallet) => (
          <Wallet
            key={wallet._id}
            id={wallet._id}
            name={wallet.name}
            amount={wallet.current_balance}
            currency={wallet.currency}
          />
        ))}
      </div>
      <div className="">
        <AddWallet />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-8">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <DatePickerWithRange />
            <CardDescription>Your Express</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Transaction />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
