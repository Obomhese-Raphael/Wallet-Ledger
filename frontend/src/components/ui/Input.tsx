import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500"
      />
    </div>
  );
};

export default Input;
