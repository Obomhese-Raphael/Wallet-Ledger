import { useQuery } from "@tanstack/react-query";
import { CreditCard, Receipt, TrendingUp } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import BalanceCard from "../../components/dashboard/BalanceCard";
import StatCard from "../../components/dashboard/StatCard";

import { getBalance } from "../../services/wallet.service";
import { getTransactions } from "../../services/transaction.service";

export default function Dashboard() {
  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  const { data: transactionData } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const balance = balanceData?.data ?? 0;

  const transactions = transactionData?.data.transactions ?? [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <BalanceCard balance={balance} />

        <div className="grid gap-6 lg:grid-cols-3">
          <StatCard
            title="Transactions"
            value={transactions.length}
            icon={Receipt}
            color="bg-indigo-600"
          />

          <StatCard
            title="Account Status"
            value="Active"
            icon={TrendingUp}
            color="bg-emerald-600"
          />

          <StatCard
            title="Wallet"
            value="1"
            icon={CreditCard}
            color="bg-violet-600"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
