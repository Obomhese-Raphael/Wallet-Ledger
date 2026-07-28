import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionCard from "../../components/transactions/TransactionCard";
import TransactionSearch from "../../components/transactions/TransactionSearch";

import { getTransactions } from "../../services/transaction.service";
import type { Transaction } from "../../types/transaction";
import type {
  TransactionStatusFilter,
  TransactionTypeFilter,
} from "../../components/transactions/TransactionFilters";
import TransactionFilterBar from "../../components/transactions/TransactionFilters";
import TransactionDetailsModal from "../../components/transactions/TransactionDetailModal";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [statusFilter, setStatusFilter] =
    useState<TransactionStatusFilter>("all");

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const transactions = data?.data.transactions ?? [];
  const pagination = data?.data.pagination;

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      if (!matchesType || !matchesStatus) return false;

      if (!query) return true;

      const haystack = [
        transaction.recipientName,
        transaction.recipientEmail,
        transaction.senderName,
        transaction.senderEmail,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [transactions, search, typeFilter, statusFilter]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-12 shadow">
            <div className="text-center">
              <div className="text-6xl">⚠️</div>

              <h1 className="mt-5 text-3xl font-bold text-red-600">
                Couldn't load transactions
              </h1>

              <p className="mt-3 text-slate-500">
                Please refresh the page and try again.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (transactions.length === 0) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl bg-white p-12 shadow">
            <div className="text-center">
              <div className="text-6xl">📄</div>

              <h1 className="mt-5 text-3xl font-bold">No Transactions Yet</h1>

              <p className="mt-3 text-slate-500">
                Your deposits, withdrawals and transfers will appear here.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalIn = transactions
    .filter((t) => t.type === "deposit" || t.type === "transfer_in")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter((t) => t.type === "withdraw" || t.type === "transfer_out")
    .reduce((sum, t) => sum + t.amount, 0);

  const net = totalIn - totalOut;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="rounded-2xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 p-5 sm:rounded-3xl sm:p-8 text-white shadow-xl">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100 sm:text-sm sm:tracking-[0.25em]">
                Wallet Ledger
              </p>

              <h1 className="mt-1 text-2xl font-extrabold sm:mt-2 sm:text-4xl">
                Transactions
              </h1>

              <p className="mt-1.5 max-w-2xl text-xs text-indigo-100 sm:mt-3 sm:text-base">
                Every deposit, withdrawal and transfer made from your wallet.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md sm:block sm:rounded-2xl sm:px-6 sm:py-5">
              <p className="text-xs text-indigo-100 sm:text-sm">
                Total Transactions
              </p>

              <h2 className="text-2xl font-bold sm:mt-2 sm:text-5xl">
                {pagination?.total ?? 0}
              </h2>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
          <StatCard
            title="Transactions"
            value={transactions.length}
            subtitle="Loaded"
            icon={<Wallet className="h-4 w-4 sm:h-5 sm:w-5" />}
            color="bg-indigo-100 text-indigo-600"
          />

          <StatCard
            title="Money In"
            value={`₦${totalIn.toLocaleString()}`}
            subtitle="Deposits & Incoming"
            icon={<ArrowDownCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
            color="bg-emerald-100 text-emerald-600"
          />

          <StatCard
            title="Money Out"
            value={`₦${totalOut.toLocaleString()}`}
            subtitle="Withdrawals & Transfers"
            icon={<ArrowUpCircle className="h-4 w-4 sm:h-5 sm:w-5" />}
            color="bg-red-100 text-red-500"
          />

          <StatCard
            title="Net Flow"
            value={`₦${net.toLocaleString()}`}
            subtitle={net >= 0 ? "Positive" : "Negative"}
            icon={<ArrowRightLeft className="h-4 w-4 sm:h-5 sm:w-5" />}
            color="bg-sky-100 text-sky-600"
          />
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <TransactionSearch value={search} onChange={setSearch} />

          <TransactionFilterBar
            typeFilter={typeFilter}
            statusFilter={statusFilter}
            onTypeChange={setTypeFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Transaction List */}
        {filteredTransactions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
            <div className="text-4xl sm:text-5xl">🔍</div>

            <h2 className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">
              No matching transactions
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-base">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 sm:space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTransaction(transaction)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedTransaction(transaction);
                  }
                }}
                className="cursor-pointer transition hover:-translate-y-0.5 focus:outline-none"
              >
                <TransactionCard transaction={transaction} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Page {pagination?.page} of {pagination?.totalPages}
          </p>

          <p className="text-sm font-medium text-indigo-600">
            {pagination?.total} Total Transactions
          </p>
        </div>
      </div>

      <TransactionDetailsModal
        open={!!selectedTransaction}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </DashboardLayout>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}
function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-3.5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:rounded-3xl
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
            {title}
          </p>

          <h2 className="mt-1 truncate text-base font-bold text-slate-900 sm:mt-3 sm:text-3xl">
            {value}
          </h2>

          <p className="mt-1 truncate text-[11px] text-slate-400 sm:mt-2 sm:text-sm">
            {subtitle}
          </p>
        </div>

        <div
          className={`shrink-0 rounded-xl p-2 sm:rounded-2xl sm:p-3.5 transition group-hover:scale-105 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}