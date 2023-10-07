
import AddTransaction from "@/components/AddTransaction"
import Wallet from "@/components/Wallet"
import { WalletType } from "@/types/wallet"
import { Transaction } from "@/components/transaction"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { getServerSession } from "next-auth"
import { getWallets } from "@/lib/wallet"
import { getUserByEmail } from "@/lib/user"


const wallets = [
    {
        'id': 1,
        'name': 'Illa Bank Wallet',
        'initial_balance': 454.231,
        'currency': 'USD'
    },
    {
        'id': 2,
        'name': 'NBB Bank Wallet',
        'initial_balance': 45.231,
        'currency': 'USD'
    }
]

export default async function AuthenticatedLanding() {
    const session = await getServerSession()
    if (!session) {
        return <div>Not Authenticated</div>
    }
    const user = await getUserByEmail(session.user?.email)
    // console.log('user', user)
    // const wallets: WalletDocument[] = await getWallets(user.id)
    const walletData = await getWallets(user.id)
    console.log('walletData', walletData)
    // const wallets = walletData || []
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {wallets.map((wallet) => (
                    <Wallet key={wallet.id} id={wallet.id} name={wallet.name} amount={wallet.initial_balance} currency={wallet.currency} />
                ))
                }
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AddTransaction />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-8">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <DatePickerWithRange />
                        <CardDescription>
                            Your Express
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Transaction />
                    </CardContent>
                </Card>

            </div>
        </section>
    )
}
