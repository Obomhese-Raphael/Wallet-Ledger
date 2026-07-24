import { ArrowUpRight, Wallet } from "lucide-react";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-4xl
        bg-linear-to-br
        from-indigo-700
        via-violet-700
        to-blue-700
        p-8
        text-white
        shadow-2xl
      "
    >
      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
              <Wallet size={26} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-100">
                Wallet Balance
              </p>

              <h2 className="mt-2 text-5xl font-black tracking-tight">
                ₦{balance.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-200">
            Active
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="text-indigo-100">Available Balance</p>

            <p className="mt-1 text-lg font-semibold">Ready for transfers</p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-white/15 px-5 py-3 backdrop-blur transition hover:bg-white/25">
            Details
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
