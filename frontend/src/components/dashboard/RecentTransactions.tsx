import { ArrowDownCircle, ArrowRightLeft, ArrowUpCircle } from "lucide-react";

import type { Transaction } from "../../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  function getIcon(type: string) {
    switch (type) {
      case "deposit":
        return <ArrowDownCircle className="text-emerald-600" size={22} />;

      case "withdraw":
        return <ArrowUpCircle className="text-red-500" size={22} />;

      default:
        return <ArrowRightLeft className="text-indigo-600" size={22} />;
    }
  }

  return (
    <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Transactions</h2>

        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-all hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-slate-100 p-3">
                {getIcon(transaction.type)}
              </div>

              <div>
                <h3 className="font-semibold capitalize">{transaction.type}</h3>

                <p className="text-sm text-slate-500">
                  {transaction.description}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  transaction.type === "deposit"
                    ? "text-emerald-600"
                    : transaction.type === "withdraw"
                      ? "text-red-500"
                      : "text-indigo-600"
                }`}
              >
                {transaction.type === "deposit" ? "+" : "-"}₦
                {transaction.amount.toLocaleString()}
              </p>

              <p className="text-xs text-slate-400">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
