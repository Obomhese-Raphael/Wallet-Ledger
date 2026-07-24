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
      <div className="absolute -right-32 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <Wallet size={30} />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[4px] text-indigo-100">
                Available Balance
              </p>

              <h2 className="mt-3 text-5xl font-black">
                ₦{balance.toLocaleString()}
              </h2>
            </div>
          </div>

          <button className="rounded-2xl bg-white/15 p-4 backdrop-blur transition hover:bg-white/25">
            <ArrowUpRight />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="text-indigo-100">Wallet Status</p>

            <h3 className="mt-1 text-lg font-semibold">Active</h3>
          </div>

          <div className="rounded-full bg-emerald-400/20 px-5 py-2 font-semibold text-emerald-200">
            ● Live
          </div>
        </div>
      </div>
    </div>
  );
}
