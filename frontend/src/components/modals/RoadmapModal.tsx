import { AnimatePresence, motion } from "framer-motion";
import {
  Rocket,
  CreditCard,
  KeyRound,
  Moon,
  UserCircle,
  Bell,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RoadmapModal({ open, onClose }: Props) {
  const planned = [
    {
      icon: FcGoogle,
      title: "Google Sign-In",
    },
    {
      icon: FaGithub,
      title: "GitHub Sign-In",
    },
    {
      icon: KeyRound,
      title: "Forgot Password",
    },
    {
      icon: CreditCard,
      title: "Online Card Payments",
    },
  ];

  const future = [
    {
      icon: UserCircle,
      title: "Profile Settings",
    },
    {
      icon: Moon,
      title: "Dark Mode",
    },
    {
      icon: Bell,
      title: "Notifications",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
                fixed
                left-1/2
                top-1/2
                z-50
                w-[92%]
                max-w-md
                -translate-x-1/2
                -translate-y-1/2
                rounded-3xl
                bg-white
                p-6
                shadow-2xl
            "
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                <Rocket className="text-indigo-600" size={22} />
              </div>

              <h1 className="text-3xl font-bold">Wallet Ledger</h1>

              <p className="text-slate-500">Version 1.1 Roadmap</p>
            </div>

            <div className="mt-5">
              <h2 className="font-semibold text-slate-900">Planned Features</h2>

              <div className="mt-4 space-y-2">
                {planned.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-indigo-600" />

                        <span className="font-medium text-slate-800">
                          {item.title}
                        </span>
                      </div>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Planned
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-semibold text-slate-900">Future Ideas</h2>

              <div className="mt-4 space-y-2">
                {future.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                    >
                      <Icon size={20} className="text-slate-500" />

                      <span className="text-slate-700">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                mt-8
                w-full
                rounded-2xl
                bg-indigo-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-indigo-700
              "
            >
              Awesome 🚀
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
