import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Button from "../ui/Button";

export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="secondary" className="py-2.5">
        <FcGoogle size={20} />
      </Button>

      <Button type="button" variant="secondary" className="py-2.5">
        <FaGithub size={20} className="text-slate-800" />
      </Button>
    </div>
  );
}
