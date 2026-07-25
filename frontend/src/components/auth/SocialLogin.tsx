import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

import Button from "../ui/Button";

export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="secondary"
        className="relative py-3"
        onClick={() =>
          toast("🚀 Google Sign-In is coming in Wallet Ledger v1.1!", {
            icon: "✨",
          })
        }
      >
        <FcGoogle size={20} />

        <span
          className="
            absolute
            -top-2
            -right-2
            rounded-full
            bg-indigo-600
            px-2
            py-0.5
            text-[10px]
            font-bold
            text-white
          "
        >
          v1.1
        </span>
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="relative py-3"
        onClick={() =>
          toast("🐙 GitHub Sign-In is coming in Wallet Ledger v1.1!", {
            icon: "🚀",
          })
        }
      >
        <FaGithub size={20} className="text-slate-800" />

        <span
          className="
            absolute
            -top-2
            -right-2
            rounded-full
            bg-indigo-600
            px-2
            py-0.5
            text-[10px]
            font-bold
            text-white
          "
        >
          v1.1
        </span>
      </Button>
    </div>
  );
}
