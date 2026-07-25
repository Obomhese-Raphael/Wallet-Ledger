import type { Transaction } from "../../types/transaction";

export type TransactionTypeFilter = "all" | Transaction["type"];
export type TransactionStatusFilter = "all" | Transaction["status"];

interface Props {
  typeFilter: TransactionTypeFilter;
  statusFilter: TransactionStatusFilter;
  onTypeChange: (value: TransactionTypeFilter) => void;
  onStatusChange: (value: TransactionStatusFilter) => void;
}

const TYPE_OPTIONS: { label: string; value: TransactionTypeFilter }[] = [
  { label: "All Types", value: "all" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdrawal", value: "withdraw" },
  { label: "Transfer In", value: "transfer_in" },
  { label: "Transfer Out", value: "transfer_out" },
];

const STATUS_OPTIONS: { label: string; value: TransactionStatusFilter }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export default function TransactionFilterBar({
  typeFilter,
  statusFilter,
  onTypeChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 sm:flex-nowrap">
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value as TransactionTypeFilter)}
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          font-medium
          text-slate-700
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
        "
      >
        {TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as TransactionStatusFilter)
        }
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          font-medium
          text-slate-700
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
        "
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
