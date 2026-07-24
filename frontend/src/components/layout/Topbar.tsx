import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/70 bg-white/70 px-8 backdrop-blur-xl">
      {/* Left */}

      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-sm text-slate-500">
            Welcome back, {user?.firstName}
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* Search */}

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="
              w-72
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
              focus:ring-4
              focus:ring-indigo-100
            "
          />
        </div>

        {/* Notification */}

        <button
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            transition
            hover:bg-slate-200
          "
        >
          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-3 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>

          <div className="hidden lg:block">
            <p className="font-semibold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
