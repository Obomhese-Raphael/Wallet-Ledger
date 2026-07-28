import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TbCurrencyNaira } from "react-icons/tb";
import { TriangleAlert, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionStepper from "../../components/transactions/TransactionStepper";
import Button from "../../components/ui/Button";

import { getBalance, withdraw } from "../../services/wallet.service";

export default function Withdraw() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");

  const queryClient = useQueryClient();

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  const balance = balanceData?.data ?? 0;

  const mutation = useMutation({
    mutationFn: withdraw,

    onSuccess: () => {
      toast.success("Withdrawal Successful");

      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      setStep(2);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Unable to process withdrawal.",
      );
    },
  });

  function continueToReview() {
    const value = Number(amount);

    if (!value || value <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    if (value > balance) {
      toast.error("Insufficient Balance");
      return;
    }

    setStep(1);
  }

  function confirmWithdrawal() {
    mutation.mutate({
      amount: Number(amount),
    });
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <TransactionStepper
          currentStep={step}
          steps={["Amount", "Review", "Success"]}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="amount"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -40,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold">Withdraw Funds</h1>

                    <p className="mt-2 text-slate-500">
                      Withdraw money from your wallet.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white">
                    <p className="text-sm uppercase tracking-widest">
                      Available Balance
                    </p>

                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                      ₦{balance.toLocaleString()}
                    </h2>
                  </div>

                  <div>
                    <label className="mb-3 block font-semibold">
                      Withdrawal Amount
                    </label>

                    <div className="relative">
                      <TbCurrencyNaira
                        size={22}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600"
                      />

                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          py-4
                          pl-12
                          pr-4
                          text-lg
                          font-semibold
                          outline-none
                          focus:border-indigo-500
                          focus:ring-4
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 rounded-2xl bg-amber-50 p-5">
                    <TriangleAlert className="text-amber-500" />

                    <p className="text-sm text-amber-700">
                      Withdrawals are processed instantly. Please verify the
                      amount before continuing.
                    </p>
                  </div>

                  <Button fullWidth onClick={continueToReview}>
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="review"
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -40,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="space-y-5 sm:space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      Review Withdrawal
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 sm:mt-2 sm:text-base">
                      Confirm the details below.
                    </p>
                  </div>

                  <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:space-y-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-500 sm:text-base">
                        Amount
                      </span>

                      <span className="text-base font-bold sm:text-lg">
                        ₦{Number(amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-500 sm:text-base">
                        Remaining Balance
                      </span>

                      <span className="text-right text-base font-bold text-indigo-600 sm:text-lg">
                        ₦{(balance - Number(amount)).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-500 sm:text-base">
                        Status
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:text-sm">
                        Instant
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setStep(0)}
                    >
                      Back
                    </Button>

                    <Button
                      fullWidth
                      onClick={confirmWithdrawal}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending
                        ? "Processing..."
                        : "Confirm Withdrawal"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="space-y-8 text-center">
                  <CheckCircle2 size={80} className="mx-auto text-green-500" />

                  <div>
                    <h2 className="text-3xl font-bold">
                      Withdrawal Successful
                    </h2>

                    <p className="mt-3 text-slate-500">
                      ₦{Number(amount).toLocaleString()} has been withdrawn
                      successfully.
                    </p>
                  </div>

                  <Button
                    fullWidth
                    onClick={() => {
                      setAmount("");
                      setStep(0);
                    }}
                  >
                    Make Another Withdrawal
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
