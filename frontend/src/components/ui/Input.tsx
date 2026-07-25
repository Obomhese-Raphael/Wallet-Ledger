import { useState, forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50/50
              px-3.5
              py-2.5
              pr-12
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

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                hover:text-indigo-600
                transition
              "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
