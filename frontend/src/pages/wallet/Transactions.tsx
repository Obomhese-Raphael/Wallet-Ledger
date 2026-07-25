import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
  Search,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionCard from "../../components/transactions/TransactionCard";
import { getTransactions } from "../../services/transaction.service";

export default function Transactions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const transactions = data?.data.transactions ?? [];
  const pagination = data?.data.pagination;

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "deposit" | "withdraw" | "transfer"
  >("all");

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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(search.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "deposit"
            ? transaction.type === "deposit"
            : filter === "withdraw"
              ? transaction.type === "withdraw"
              : transaction.type === "transfer_in" ||
                transaction.type === "transfer_out";

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

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
            icon={<Wallet size={15} />}
            color="bg-indigo-100 text-indigo-600"
          />

          <StatCard
            title="Money In"
            value={`₦${totalIn.toLocaleString()}`}
            subtitle="Deposits & Incoming"
            icon={<ArrowDownCircle size={15} />}
            color="bg-emerald-100 text-emerald-600"
          />

          <StatCard
            title="Money Out"
            value={`₦${totalOut.toLocaleString()}`}
            subtitle="Withdrawals & Transfers"
            icon={<ArrowUpCircle size={15} />}
            color="bg-red-100 text-red-500"
          />

          <StatCard
            title="Net Flow"
            value={`₦${net.toLocaleString()}`}
            subtitle={net >= 0 ? "Positive" : "Negative"}
            icon={<ArrowRightLeft size={15} />}
            color="bg-sky-100 text-sky-600"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search description or reference..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          py-3
          pl-11
          pr-4
          outline-none
          transition
          focus:border-indigo-500
          focus:bg-white
        "
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {["all", "deposit", "transfer", "withdraw"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item as typeof filter)}
                  className={`
            rounded-full
            px-5
            py-2
            text-sm
            font-semibold
            transition

            ${
              filter === item
                ? "bg-indigo-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
          `}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <div className="text-5xl">🔍</div>

              <h2 className="mt-5 text-2xl font-bold">
                No matching transactions
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search or change the filter.
              </p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))
          )}
        </div>

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
