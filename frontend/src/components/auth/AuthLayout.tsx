import type { ReactNode } from "react";
import { LuBadgeCheck } from "react-icons/lu";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2 bg-slate-50 font-sans antialiased">
      {/* Left Side */}
    <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white px-12 xl:px-16">
        <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-none">
          Wallet <br />
          Ledger
        </h1>

        <p className="mt-5 max-w-md text-lg leading-relaxed text-indigo-100/90 font-normal">
          Manage your money with confidence. Deposit, transfer, withdraw, and
          track every transaction from one secure dashboard.
        </p>

        <div className="mt-8 space-y-3">
          {[
            "Instant wallet-to-wallet transfers",
            "Real-time transaction history",
            "Fast deposits & withdrawals",
            "Cloud hosted & always available",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-xl bg-white/10 px-3.5 py-2.5 backdrop-blur-md border border-white/10"
            >
              <LuBadgeCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <p className="text-sm font-medium text-indigo-50">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
