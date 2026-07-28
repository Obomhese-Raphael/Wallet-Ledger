import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl sm:h-20 sm:px-8">
      {/* Left */}
      <div
        className="flex min-w-0 cursor-pointer items-center gap-3 sm:gap-6"
        onClick={() => navigate("/")}
      >
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-slate-900 sm:text-2xl">
            Dashboard
          </h1>

          <p className="truncate text-xs text-slate-500 sm:text-sm">
            Welcome back, {user?.firstName}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5 sm:gap-5">
        {/* Search Input (Desktop Only) */}
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

        {/* Notification Button */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            transition
            hover:bg-slate-200
            sm:h-12
            sm:w-12
            sm:rounded-2xl
          "
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 sm:right-3 sm:top-3 sm:h-2.5 sm:w-2.5" />
        </button>

        {/* User Profile / Avatar */}
        <div className="flex items-center gap-3 rounded-2xl p-0 sm:bg-slate-100 sm:px-3 sm:py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
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
