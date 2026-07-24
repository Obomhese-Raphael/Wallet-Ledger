import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  function handleLogout() {
    logout();

    navigate("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {user?.firstName} 👋
            </h1>

            <p className="mt-2 text-slate-500">
              You have successfully logged in to Wallet Ledger.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <p className="mt-4 text-slate-600">
            Authentication is working correctly.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-6">
              <p className="text-slate-500">Wallet Balance</p>

              <h3 className="mt-2 text-3xl font-bold">₦0.00</h3>
            </div>

            <div className="rounded-xl border p-6">
              <p className="text-slate-500">Transactions</p>

              <h3 className="mt-2 text-3xl font-bold">0</h3>
            </div>

            <div className="rounded-xl border p-6">
              <p className="text-slate-500">Status</p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">Active</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
