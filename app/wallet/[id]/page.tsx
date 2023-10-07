import { transactionSample } from '@/lib/data'
import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"
import { getServerSession } from "next-auth"
import UnauthenticatedLanding from '@/app/landing'

export default async function WalletDetail() {

  const session = await getServerSession()

  if (!session) {
    return <UnauthenticatedLanding />
  }

  const data = transactionSample
  return (
    <section className="container grid items-center gap-6 pb-5">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">NBB Wallet!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your transactions for this wallet!

            </p>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </section>
  )
}

