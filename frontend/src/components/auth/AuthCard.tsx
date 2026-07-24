import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthCard({ children }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
      {children}
    </div>
  );
}
