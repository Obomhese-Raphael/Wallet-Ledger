import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button = ({ children, loading, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
