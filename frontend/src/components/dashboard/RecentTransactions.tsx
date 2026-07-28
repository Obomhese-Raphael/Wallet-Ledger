import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import type { Transaction } from "../../types/transaction";
import { useNavigate } from "react-router-dom";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  const navigate = useNavigate();

  function getIcon(type: string) {
    switch (type) {
      case "deposit":
        return <ArrowDownCircle className="text-emerald-600" size={18} />;

      case "withdraw":
        return <ArrowUpCircle className="text-red-500" size={18} />;

      case "transfer_in":
        return <ArrowDownLeft className="text-sky-600" size={18} />;

      case "transfer_out":
        return <ArrowUpRight className="text-amber-600" size={18} />;

      default:
        return <ArrowDownCircle className="text-slate-500" size={18} />;
    }
  }

  function getTitle(type: string) {
    switch (type) {
      case "deposit":
        return "Deposit";

      case "withdraw":
        return "Withdrawal";

      case "transfer_in":
        return "Money Received";

      case "transfer_out":
        return "Money Sent";

      default:
        return type;
    }
  }

  return (
    <div className="w-full max-w-full overflow-hidden rounded-3xl border border-white bg-white/80 p-3 sm:p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold sm:text-xl">Recent Transactions</h2>

        <button
          onClick={() => navigate("/transactions")}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 sm:text-sm"
        >
          View All
        </button>
      </div>

      <div className="mt-3 space-y-2 sm:mt-6 sm:space-y-4">
        {transactions.slice(0, 5).map((transaction) => {
          const isPositive =
            transaction.type === "deposit" ||
            transaction.type === "transfer_in";

          return (
            <div
              key={transaction._id}
              className="flex items-center justify-between gap-1.5 rounded-2xl border border-slate-100 p-2 sm:p-4 transition-all hover:bg-slate-50"
            >
              {/* Left Side: Icon + Details */}
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <div className="shrink-0 rounded-xl bg-slate-100 p-2 sm:p-3">
                  {getIcon(transaction.type)}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-semibold sm:text-base">
                    {getTitle(transaction.type)}
                  </h3>
                  <p className="truncate text-[11px] text-slate-500 sm:text-sm">
                    {transaction.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Amount + Date */}
              <div className="shrink-0 text-right">
                <p
                  className={`whitespace-nowrap text-xs font-bold sm:text-lg ${
                    transaction.type === "deposit"
                      ? "text-emerald-600"
                      : transaction.type === "withdraw"
                        ? "text-red-500"
                        : transaction.type === "transfer_in"
                          ? "text-sky-600"
                          : "text-amber-600"
                  }`}
                >
                  {isPositive ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                </p>

                <p className="text-[10px] text-slate-400 sm:text-xs">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
