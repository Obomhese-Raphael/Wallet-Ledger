import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Deposit",
    subtitle: "Fund your wallet",
    icon: ArrowDownCircle,
    color: "from-emerald-500 to-green-600",
    path: "/deposit",
  },
  {
    title: "Withdraw",
    subtitle: "Move money out",
    icon: ArrowUpCircle,
    color: "from-rose-500 to-red-600",
    path: "/withdraw",
  },
  {
    title: "Transfer",
    subtitle: "Send to another user",
    icon: ArrowRightLeft,
    color: "from-indigo-500 to-violet-600",
    path: "/transfer",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-xl backdrop-blur">
      <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

      <div className="mt-6 space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group flex w-full items-center justify-between rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl bg-linear-to-br ${action.color} p-3 text-white`}
                >
                  <Icon size={22} />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">{action.subtitle}</p>
                </div>
              </div>

              <span className="text-xl text-slate-300 transition group-hover:translate-x-1">
                →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
