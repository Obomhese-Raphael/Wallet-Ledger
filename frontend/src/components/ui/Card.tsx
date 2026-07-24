import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
      {children}
    </div>
  );
}
