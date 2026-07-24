import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="rounded-3xl border border-white/70 bg-white/80 p-10 shadow-xl backdrop-blur">
        <h2 className="text-4xl font-bold">Dashboard</h2>

        <p className="mt-3 text-slate-500">Welcome to Wallet Ledger.</p>
      </div>
    </DashboardLayout>
  );
}
