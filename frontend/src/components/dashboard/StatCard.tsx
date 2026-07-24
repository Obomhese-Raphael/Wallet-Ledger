import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ title, value, icon: Icon, color }: Props) {
  return (
    <div
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur
        p-6
        shadow-lg
        border
        border-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-bold">{value}</h3>
        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          <Icon className="text-white" size={22} />
        </div>
      </div>
    </div>
  );
}
