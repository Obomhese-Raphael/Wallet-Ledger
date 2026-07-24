import { useQuery } from "@tanstack/react-query";
import { CreditCard, Receipt, TrendingUp } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BalanceCard from "../../components/dashboard/BalanceCard";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

import { getBalance } from "../../services/wallet.service";
import { getTransactions } from "../../services/transaction.service";
import Greeting from "../../components/dashboard/Greeting";

import { calculateAnalytics } from "../../utils/analytics";

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

  const analytics = calculateAnalytics(transactions);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Greeting />
        <BalanceCard balance={balance} />

        <div className="grid gap-6 lg:grid-cols-4">
          <StatCard
            title="Deposits"
            value={`₦${analytics.totalDeposits.toLocaleString()}`}
            subtitle="Money Added"
            icon={TrendingUp}
            color="bg-gradient-to-br from-emerald-500 to-green-600"
          />

          <StatCard
            title="Withdrawals"
            value={`₦${analytics.totalWithdrawals.toLocaleString()}`}
            subtitle="Money Removed"
            icon={CreditCard}
            color="bg-gradient-to-br from-red-500 to-rose-600"
          />

          <StatCard
            title="Transfers"
            value={`₦${analytics.totalTransfers.toLocaleString()}`}
            subtitle="Money Sent"
            icon={Receipt}
            color="bg-gradient-to-br from-indigo-500 to-violet-600"
          />

          <StatCard
            title="Average"
            value={`₦${analytics.averageTransaction.toLocaleString()}`}
            subtitle="Average Transaction"
            icon={TrendingUp}
            color="bg-gradient-to-br from-orange-500 to-amber-500"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>

          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}
