import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div
      className="

            rounded-3xl

            bg-white

            shadow-xl

            border

            border-slate-100

            p-8

            "
    >
      {children}
    </div>
  );
}
