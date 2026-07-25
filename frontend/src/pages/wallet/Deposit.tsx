import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";

import { SiPayoneer } from "react-icons/si";
import { TbCurrencyNaira } from "react-icons/tb";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";

import { deposit } from "../../services/wallet.service";

export default function Deposit() {
  const [amount, setAmount] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deposit,

    onSuccess: () => {
      toast.success("Deposit Successful", {
        description: `₦${Number(amount).toLocaleString()} has been added to your wallet.`,
      });

      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      setAmount("");
    },

    onError: (error: any) => {
      toast.error("Deposit Failed", {
        description:
          error?.response?.data?.message ?? "Unable to complete your deposit.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Invalid Amount", {
        description: "Please enter a valid amount.",
      });

      return;
    }

    mutation.mutate({
      amount: Number(amount),
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-white via-slate-50 to-slate-100 shadow-xl">
          <div className="border-b border-slate-200 px-8 py-6">
            <h1 className="text-3xl font-bold text-slate-900">Deposit Funds</h1>

            <p className="mt-2 text-slate-500">
              Instantly fund your wallet securely.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Amount
              </label>

              <div className="relative">
                <TbCurrencyNaira
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600"
                  size={22}
                />

                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    py-4
                    pl-12
                    pr-4
                    text-lg
                    font-semibold
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                  "
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Supported Payment Methods
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Secure payments powered by trusted providers.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                  onClick={() =>
                    toast("💳 Visa deposits arrive in Wallet Ledger v1.1!", {
                      icon: "🚀",
                    })
                  }
                  className="
    flex
    h-20
    cursor-pointer
    items-center
    justify-center
    rounded-2xl
    border
    bg-white
    shadow-sm
    transition
    hover:-translate-y-1
    hover:shadow-md
  "
                >
                  <FaCcVisa size={42} className="text-blue-700" />
                </div>
                <div
                  onClick={() =>
                    toast("💳 Visa deposits arrive in Wallet Ledger v1.1!", {
                      icon: "🚀",
                    })
                  }
                  className="
    flex
    h-20
    cursor-pointer
    items-center
    justify-center
    rounded-2xl
    border
    bg-white
    shadow-sm
    transition
    hover:-translate-y-1
    hover:shadow-md
  "
                >
                  <FaPaypal size={42} className="text-sky-600" />
                </div>
                <div
                  onClick={() =>
                    toast("💳 Visa deposits arrive in Wallet Ledger v1.1!", {
                      icon: "🚀",
                    })
                  }
                  className="
    flex
    h-20
    cursor-pointer
    items-center
    justify-center
    rounded-2xl
    border
    bg-white
    shadow-sm
    transition
    hover:-translate-y-1
    hover:shadow-md
  "
                >
                  <FaCcMastercard size={42} className="text-red-500" />
                </div>
                <div
                  onClick={() =>
                    toast("💳 Visa deposits arrive in Wallet Ledger v1.1!", {
                      icon: "🚀",
                    })
                  }
                  className="
    flex
    h-20
    cursor-pointer
    items-center
    justify-center
    rounded-2xl
    border
    bg-white
    shadow-sm
    transition
    hover:-translate-y-1
    hover:shadow-md
  "
                >
                  <SiPayoneer size={38} className="text-orange-500" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-5">
              <h4 className="font-semibold text-indigo-900">Secure Deposits</h4>

              <p className="mt-2 text-sm leading-relaxed text-indigo-700">
                Your funds are securely processed and reflected instantly in
                your wallet balance after a successful transaction.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" fullWidth disabled={mutation.isPending}>
                {mutation.isPending ? "Processing Deposit..." : "Deposit Funds"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
