import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth,
  loading = false,
  disabled,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",

        variant === "primary" && "bg-slate-900 text-white hover:bg-slate-800",

        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        fullWidth && "w-full",

        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {children}
    </button>
  );
}
