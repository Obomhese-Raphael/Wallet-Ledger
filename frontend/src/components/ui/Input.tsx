import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50/50
          px-3.5
          py-2.5
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-indigo-600
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-100
        "
      />

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
