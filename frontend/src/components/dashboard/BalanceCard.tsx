import { ArrowUpRight, Wallet } from "lucide-react";

interface Props {
  balance: number;
  isLoading?: boolean;
}

export default function BalanceCard({ balance, isLoading = false }: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl sm:rounded-4xl
        bg-linear-to-br
        from-indigo-700
        via-violet-700
        to-blue-700
        p-5 sm:p-8
        text-white
        shadow-2xl
      "
    >
      <div className="absolute -right-32 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur sm:p-4">
              <Wallet className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[2px] text-indigo-100 sm:tracking-[4px]">
                Available Balance
              </p>
            </div>
          </div>

          <button className="rounded-xl bg-white/15 p-2.5 backdrop-blur transition hover:bg-white/25 sm:p-4">
            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Balance */}
        <div className="mt-4 sm:mt-6">
          {isLoading ? (
            <div className="h-10 w-52 animate-pulse rounded-xl bg-white/20 sm:h-14 sm:w-80" />
          ) : (
            <h2 className="break-all text-3xl font-black sm:text-5xl">
              ₦{balance.toLocaleString()}
            </h2>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between sm:mt-10">
          <div>
            <p className="text-xs text-indigo-100 sm:text-base">
              Wallet Status
            </p>

            <h3 className="mt-0.5 text-base font-semibold sm:mt-1 sm:text-lg">
              Active
            </h3>
          </div>

          <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200 sm:px-5 sm:py-2 sm:text-sm">
            ● Live
          </div>
        </div>
      </div>
    </div>
  );
}
