import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98]",

        variant === "primary" &&
          "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",

        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs",

        fullWidth && "w-full",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
