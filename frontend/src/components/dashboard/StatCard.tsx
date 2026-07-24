import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: Props) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white/80
        p-6
        shadow-lg
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-black text-slate-900">{value}</h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>

        <div
          className={`
            rounded-2xl
            p-4
            text-white
            shadow-lg
            ${color}
          `}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
