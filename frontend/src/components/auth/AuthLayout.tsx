import type { ReactNode } from "react";
import { LuBadgeCheck } from "react-icons/lu";

import { useState } from "react";
import RoadmapModal from "../modals/RoadmapModal";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
   const [showRoadmap, setShowRoadmap] = useState(false);
  return (
    <div className="grid h-screen overflow-hidden bg-slate-50 font-sans antialiased lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden flex-col justify-center bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 px-12 text-white lg:flex xl:px-16">
        <h1 className="text-5xl font-extrabold leading-none tracking-tight xl:text-6xl">
          Wallet <br />
          Ledger
        </h1>

        <p className="mt-5 max-w-md text-lg font-normal leading-relaxed text-indigo-100/90">
          Manage your money with confidence. Deposit, transfer, withdraw and
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
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 backdrop-blur-md"
            >
              <LuBadgeCheck className="h-5 w-5 shrink-0 text-emerald-400" />

              <p className="text-sm font-medium text-indigo-50">{feature}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">
            Wallet Ledger
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

            <span className="text-xs font-semibold text-emerald-100">
              v1.0.0 Stable
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              console.log("Roadmap clicked");
              setShowRoadmap(true);
            }}
            className="mt-5 block text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            View Roadmap →
          </button>
        </div>

        <RoadmapModal
          open={showRoadmap}
          onClose={() => setShowRoadmap(false)}
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}
