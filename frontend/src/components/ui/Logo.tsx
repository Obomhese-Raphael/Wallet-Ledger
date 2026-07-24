import { Wallet } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Wallet size={30} className="text-indigo-600" />

      <span className="text-2xl font-bold">Wallet Ledger</span>
    </div>
  );
}
