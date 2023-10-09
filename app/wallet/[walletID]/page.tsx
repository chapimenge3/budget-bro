import { redirect } from "next/navigation";
import { getTransactions } from "@/lib/transaction";
import { getWallets, getWallet } from "@/lib/wallet";
import { columns, TransactionType } from "./columns";
import { DataTable } from "./data-table";
import Wallet from "@/components/Wallet";
import { getCategories } from "@/lib/category";
import { getLabels } from "@/lib/label";

export default async function WalletDetailPage({
  params,
}: {
  params: { walletID: string };
}) {
  const walletDetails = await getWallet(params.walletID);


  if (!walletDetails) {
    return redirect("/dashboard");
  }

  const data: TransactionType[] | null = await getTransactions(params.walletID);
  const walletsData = await getWallets();
  const walletsChoice = walletsData?.map((wallet) => ({
    _id: wallet._id.toString(),
    name: wallet.name,
  }));
  const categories = await getCategories();
  const labels = await getLabels();
  return (
    <section className="container grid items-center gap-6 pb-5">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Wallet
          key={walletDetails._id}
          id={walletDetails._id}
          name={walletDetails.name}
          amount={walletDetails.current_balance}
          currency={walletDetails.currency}
          initial_balance={walletDetails.initial_balance}
        />
        <DataTable data={data || []} columns={columns} walletChoice={walletsChoice} labelChoice={labels || []} categoryChoice={categories || []} />
      </div>
    </section>
  );
}
