import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
  ReceiptText,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Deposit",
    path: "/deposit",
    icon: ArrowDownCircle,
  },
  {
    name: "Withdraw",
    path: "/withdraw",
    icon: ArrowUpCircle,
  },
  {
    name: "Transfer",
    path: "/transfer",
    icon: ArrowRightLeft,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: ReceiptText,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-8 py-8">
        <h1 className="text-3xl font-black tracking-tight">Wallet Ledger</h1>

        <p className="mt-2 text-sm text-slate-400">Digital Wallet</p>
      </div>

      <nav className="flex-1 px-5 py-8 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                rounded-2xl
                px-5
                py-4
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `
              }
            >
              <Icon size={22} />

              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-5
            py-4
            text-red-400
            transition
            hover:bg-red-500/10
          "
        >
          <LogOut size={22} />
          Logout
        </button>
      </div>
    </aside>
  );
}
