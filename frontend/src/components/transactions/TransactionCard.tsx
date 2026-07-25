import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import type { Transaction } from "../../types/transaction";

interface Props {
  transaction: Transaction;
  onClick?: () => void;
}

export default function TransactionCard({ transaction, onClick }: Props) {
  const incoming =
    transaction.type === "deposit" || transaction.type === "transfer_in";

  function getIcon() {
    switch (transaction.type) {
      case "deposit":
        return <ArrowDownCircle size={24} className="text-emerald-600" />;

      case "withdraw":
        return <ArrowUpCircle size={24} className="text-red-500" />;

      case "transfer_in":
        return <ArrowRightLeft size={24} className="text-sky-600" />;

      case "transfer_out":
        return <ArrowRightLeft size={24} className="text-indigo-600" />;

      default:
        return <ArrowRightLeft size={24} />;
    }
  }

  function getTitle() {
    switch (transaction.type) {
      case "deposit":
        return "Wallet Deposit";

      case "withdraw":
        return "Withdrawal";

      case "transfer_in":
        return "Transfer Received";

      case "transfer_out":
        return "Transfer Sent";

      default:
        return transaction.type;
    }
  }

  function statusBadge() {
    switch (transaction.status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={13} />
            Completed
          </span>
        );

      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            <Clock3 size={13} />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <XCircle size={13} />
            Failed
          </span>
        );
    }
  }

  return (
    <button
      onClick={onClick}
      className="
      group
      w-full
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      text-left
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-indigo-200
      hover:shadow-xl
    "
    >
      <div className="flex items-start justify-between">
        {/* Left */}
        <div className="flex gap-4">
          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            transition
            group-hover:scale-105
          "
          >
            {getIcon()}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">{getTitle()}</h3>

            <p className="mt-1 text-sm text-slate-500">
              {transaction.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-5 text-xs text-slate-400">
              <div>
                <p className="uppercase tracking-wide">Reference</p>

                <p className="mt-1 font-medium text-slate-700">
                  {transaction.reference}
                </p>
              </div>

              <div>
                <p className="uppercase tracking-wide">Date</p>

                <p className="mt-1 font-medium text-slate-700">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="text-right">
          <h2
            className={`text-2xl font-bold ${
              incoming ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {incoming ? "+" : "-"}₦{transaction.amount.toLocaleString()}
          </h2>

          <div className="mt-4">{statusBadge()}</div>
        </div>
      </div>
    </button>
  );
}
