import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 overflow-hidden">
        <Topbar />

        <div
          className="
            min-h-[calc(100vh-80px)]
            overflow-y-auto
            bg-[radial-gradient(circle_at_top_right,#eef2ff_0%,#f8fafc_40%,#f1f5f9_100%)]
            p-8
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}
