import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

  error?: string;
}

export default function Input({
  label,

  error,

  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm">{label}</label>

      <input
        {...props}
        className="

                w-full

                rounded-xl

                border

                border-slate-300

                px-4

                py-3

                outline-none

                transition

                focus:border-indigo-600

                focus:ring-4

                focus:ring-indigo-100

                "
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
