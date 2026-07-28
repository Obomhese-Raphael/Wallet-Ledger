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
        return (
          <ArrowDownCircle className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
        );

      case "withdraw":
        return <ArrowUpCircle className="h-5 w-5 text-red-500 sm:h-6 sm:w-6" />;

      case "transfer_in":
        return (
          <ArrowRightLeft className="h-5 w-5 text-sky-600 sm:h-6 sm:w-6" />
        );

      case "transfer_out":
        return (
          <ArrowRightLeft className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6" />
        );

      default:
        return <ArrowRightLeft className="h-5 w-5 sm:h-6 sm:w-6" />;
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
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 sm:px-3 sm:py-1 sm:text-xs">
            <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" />
            Completed
          </span>
        );

      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 sm:px-3 sm:py-1 sm:text-xs">
            <Clock3 size={12} className="sm:w-3.5 sm:h-3.5" />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-700 sm:px-3 sm:py-1 sm:text-xs">
            <XCircle size={12} className="sm:w-3.5 sm:h-3.5" />
            Failed
          </span>
        );
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        max-w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-3.5
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-indigo-200
        hover:shadow-md
        sm:rounded-3xl
        sm:p-6
      "
    >
      <div className="flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Section: Icon + Details */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              transition
              group-hover:scale-105
              sm:h-14
              sm:w-14
              sm:rounded-2xl
            "
          >
            {getIcon()}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs font-bold text-slate-900 sm:text-lg">
              {getTitle()}
            </h3>

            <p className="truncate text-[11px] text-slate-500 sm:mt-1 sm:text-sm">
              {transaction.description}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 sm:mt-3 sm:text-xs">
              <div className="min-w-0 max-w-30 sm:max-w-none">
                <span className="hidden uppercase tracking-wide sm:inline">
                  Reference:{" "}
                </span>
                <span className="truncate font-medium text-slate-600">
                  {transaction.reference}
                </span>
              </div>

              <span className="hidden sm:inline">•</span>

              <div>
                <span className="font-medium text-slate-600">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Amount & Badge */}
        <div className="flex shrink-0 flex-col items-end gap-1.5 text-right sm:gap-2">
          <h2
            className={`whitespace-nowrap text-sm font-bold sm:text-2xl ${
              incoming ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {incoming ? "+" : "-"}₦{transaction.amount.toLocaleString()}
          </h2>

          <div>{statusBadge()}</div>
        </div>
      </div>
    </button>
  );
}
