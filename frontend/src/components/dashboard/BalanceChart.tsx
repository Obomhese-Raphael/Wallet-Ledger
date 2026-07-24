import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { Transaction } from "../../types/transaction";

interface Props {
  transactions: Transaction[];
  currentBalance: number;
}

export default function BalanceChart({ transactions, currentBalance }: Props) {
  const orderedTransactions = [...transactions].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  let balance = currentBalance;

  // Work backwards to determine the opening balance
  for (let i = orderedTransactions.length - 1; i >= 0; i--) {
    const tx = orderedTransactions[i];

    switch (tx.type) {
      case "deposit":
        balance -= tx.amount;
        break;

      case "withdraw":
      case "transfer":
        balance += tx.amount;
        break;
    }
  }

  const chartData = [];

  let runningBalance = balance;

  for (const tx of orderedTransactions) {
    switch (tx.type) {
      case "deposit":
        runningBalance += tx.amount;
        break;

      case "withdraw":
      case "transfer":
        runningBalance -= tx.amount;
        break;
    }

    chartData.push({
      date: new Date(tx.createdAt).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      balance: runningBalance,
      type: tx.type,
    });
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Wallet Activity</h2>

          <p className="text-sm text-slate-500">Transaction trend</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="walletGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />

                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            <XAxis dataKey="date" tick={{ fontSize: 12 }} />

            <YAxis
              tickFormatter={(value) => `₦${Number(value).toLocaleString()}`}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              }}
              formatter={(value) => [
                `₦${Number(value).toLocaleString()}`,
                "Balance",
              ]}
            />

            <Area
              type="natural"
              dataKey="balance"
              stroke="#4f46e5"
              strokeWidth={3}
              fill="url(#walletGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
