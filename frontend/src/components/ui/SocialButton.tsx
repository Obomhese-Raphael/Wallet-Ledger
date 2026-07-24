import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
}

const SocialButton = ({ icon, text }: Props) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-50"
    >
      {icon}
      {text}
    </button>
  );
};

export default SocialButton;
