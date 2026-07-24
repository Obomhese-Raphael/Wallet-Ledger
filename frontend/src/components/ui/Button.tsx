import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  loading,
  fullWidth,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl",

        "bg-indigo-600",

        "hover:bg-indigo-700",

        "text-white",

        "font-semibold",

        "transition",

        "duration-200",

        "px-5",

        "py-3",

        "shadow",

        "disabled:opacity-50",

        fullWidth && "w-full",

        className,
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
