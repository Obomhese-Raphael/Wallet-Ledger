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
import type { TransactionStatusFilter, TransactionTypeFilter } from "../../components/transactions/TransactionFilters";
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
        <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600 p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-100">
                Wallet Ledger
              </p>

              <h1 className="mt-2 text-4xl font-extrabold">Transactions</h1>

              <p className="mt-3 max-w-2xl text-indigo-100">
                Every deposit, withdrawal and transfer made from your wallet.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-md">
              <p className="text-sm text-indigo-100">Total Transactions</p>

              <h2 className="mt-2 text-5xl font-bold">
                {pagination?.total ?? 0}
              </h2>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Transactions"
            value={transactions.length}
            subtitle="Loaded"
            icon={<Wallet size={22} />}
            color="bg-indigo-100 text-indigo-600"
          />

          <StatCard
            title="Money In"
            value={`₦${totalIn.toLocaleString()}`}
            subtitle="Deposits & Incoming"
            icon={<ArrowDownCircle size={22} />}
            color="bg-emerald-100 text-emerald-600"
          />

          <StatCard
            title="Money Out"
            value={`₦${totalOut.toLocaleString()}`}
            subtitle="Withdrawals & Transfers"
            icon={<ArrowUpCircle size={22} />}
            color="bg-red-100 text-red-500"
          />

          <StatCard
            title="Net Flow"
            value={`₦${net.toLocaleString()}`}
            subtitle={net >= 0 ? "Positive" : "Negative"}
            icon={<ArrowRightLeft size={22} />}
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
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-4 text-xl font-bold">No matching transactions</h2>

            <p className="mt-2 text-slate-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
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
                className="cursor-pointer transition hover:-translate-y-0.5"
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
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>

          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`rounded-2xl p-4 transition group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
