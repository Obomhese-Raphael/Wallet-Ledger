import { useState } from "react";
import { UserRound, BadgeCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionStepper from "../../components/transactions/TransactionStepper";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

import { findUserByEmail } from "../../services/user.service";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transfer, getBalance } from "../../services/wallet.service";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import { downloadReceipt } from "../../utils/downloadRecepits";


export default function Transfer() {
  const [step, setStep] = useState(0);

  const [receiverEmail, setReceiverEmail] = useState("");
  const [recipient, setRecipient] = useState<any>(null);

  const [amount, setAmount] = useState("");

  const [searching, setSearching] = useState(false);
  const [sameErrorMessage, setSameErrorMessage] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: balanceData } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });

  const balance = balanceData?.data ?? 0;

  const mutation = useMutation({
    mutationFn: transfer,

    onSuccess: () => {
      toast.success("Transfer Successful");

      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      setStep(3);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Unable to complete transfer.",
      );
    },
  });

  async function searchRecipient(email: string) {
    if (!email) {
      setRecipient(null);
      return;
    }

    if (email.trim().toLowerCase() === user?.email.toLowerCase()) {
      setRecipient(null);

      setSameErrorMessage("You cannot transfer money to your own account.");

      toast.error("You cannot transfer money to your own account.");

      return;
    }

    setSameErrorMessage("");

    const searchEmail = email.trim().toLowerCase();

    if (searchEmail === user?.email.toLowerCase()) {
      setRecipient(null);
      return;
    }

    try {
      setSearching(true);

      const response = await findUserByEmail(email);

      setRecipient(response.data);
    } catch {
      setRecipient(null);
    } finally {
      setSearching(false);
    }
  }

  function continueToAmount() {
    if (!recipient) {
      toast.error("Select a valid recipient.");
      return;
    }

    setStep(1);
  }

  function continueToReview() {
    const value = Number(amount);

    if (!value || value <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    if (value > balance) {
      toast.error("Insufficient wallet balance.");
      return;
    }

    setStep(2);
  }

  function confirmTransfer() {
    mutation.mutate({
      recipientEmail: receiverEmail,
      amount: Number(amount),
      description
    });
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <TransactionStepper
          currentStep={step}
          steps={["Recipient", "Amount", "Review", "Success"]}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {/* STEP 1 - RECIPIENT */}

            {step === 0 && (
              <motion.div
                key="recipient"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold">Transfer Money</h1>

                    <p className="mt-2 text-slate-500">
                      Send money securely to another Wallet Ledger user.
                    </p>
                  </div>

                  <Input
                    label="Recipient Email"
                    type="email"
                    placeholder="james@example.com"
                    value={receiverEmail}
                    onChange={(e) => {
                      setReceiverEmail(e.target.value);

                      searchRecipient(e.target.value);
                    }}
                  />

                  {sameErrorMessage && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-600">
                        {sameErrorMessage}
                      </p>
                    </div>
                  )}

                  {searching && (
                    <p className="text-sm text-slate-500">
                      Searching recipient...
                    </p>
                  )}

                  {recipient && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <UserRound size={24} />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold">
                            {recipient.firstName} {recipient.lastName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {recipient.email}
                          </p>

                          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                            <BadgeCheck size={16} />
                            Verified User
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    fullWidth
                    disabled={!recipient}
                    onClick={continueToAmount}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 - AMOUNT */}

            {step === 1 && (
              <motion.div
                key="amount"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold">Enter Amount</h2>

                    <p className="mt-2 text-slate-500">
                      Choose how much you'd like to send.
                    </p>
                  </div>

                  {/* Recipient */}

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
                      <UserRound size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {recipient.firstName} {recipient.lastName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {recipient.email}
                      </p>
                    </div>
                  </div>

                  {/* Balance */}

                  <div className="rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white">
                    <p className="text-sm uppercase tracking-widest opacity-80">
                      Available Balance
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                      ₦{balance.toLocaleString()}
                    </h2>
                  </div>

                  {/* Amount */}

                  <div>
                    <label className="mb-3 block font-semibold">Amount</label>

                    <div className="relative">
                      <TbCurrencyNaira
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600"
                        size={22}
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

                  {/* Description  */}

                  <div>
                    <label className="mb-3 block font-semibold">
                      Description{" "}
                      <span className="text-slate-400">(Optional)</span>
                    </label>

                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Rent for August, Electricity Bill, Birthday Gift..."
                      className="
      w-full
      resize-none
      rounded-2xl
      border
      border-slate-200
      p-4
      outline-none
      transition
      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-100
    "
                    />
                  </div>

                  {/* Quick Amounts */}

                  <div className="grid grid-cols-4 gap-3">
                    {[1000, 5000, 10000].map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(String(value))}
                        className="
              rounded-xl
              border
              border-slate-200
              py-3
              text-sm
              font-semibold
              transition
              hover:border-indigo-500
              hover:bg-indigo-50
            "
                      >
                        ₦{value.toLocaleString()}
                      </button>
                    ))}

                    <button
                      onClick={() => setAmount(String(balance))}
                      className="
            rounded-xl
            bg-indigo-600
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
          "
                    >
                      MAX
                    </button>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setStep(0)}
                    >
                      Back
                    </Button>

                    <Button fullWidth onClick={continueToReview}>
                      Continue
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 - REVIEW */}

            {step === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold">Review Transfer</h2>

                    <p className="mt-2 text-slate-500">
                      Double-check the transfer details before confirming.
                    </p>
                  </div>

                  {/* Recipient */}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white">
                        <UserRound size={24} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">
                          {recipient.firstName} {recipient.lastName}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {recipient.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Card */}

                  <div className="space-y-5 rounded-2xl bg-slate-50 p-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount</span>

                      <span className="font-bold">
                        ₦{Number(amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Description</span>

                      <span className="font-medium text-right">
                        {description.trim() ? description : "No description"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Transfer Fee</span>

                      <span className="font-bold text-emerald-600">FREE</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Remaining Balance</span>

                      <span className="font-bold text-indigo-600">
                        ₦{(balance - Number(amount)).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Status</span>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                        Instant Transfer
                      </span>
                    </div>
                  </div>

                  {/* Warning */}

                  <div className="flex gap-4 rounded-2xl bg-amber-50 p-5">
                    <TriangleAlert className="text-amber-500" />

                    <p className="text-sm text-amber-700">
                      Transfers cannot be reversed after they have been
                      confirmed. Please ensure the recipient and amount are
                      correct.
                    </p>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>

                    <Button
                      fullWidth
                      onClick={confirmTransfer}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending
                        ? "Processing..."
                        : "Confirm Transfer"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4 - SUCCESS */}

            {step === 3 && (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="space-y-8 text-center">
                  {/* Success Icon */}

                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 size={72} className="text-emerald-500" />
                  </div>

                  {/* Heading */}

                  <div>
                    <h2 className="text-4xl font-bold">
                      Transfer Successful 🎉
                    </h2>

                    <p className="mt-3 text-slate-500">
                      Your transfer has been completed successfully.
                    </p>
                  </div>

                  {/* Receipt */}

                  <div
                    id="receipt"
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="flex justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500">Recipient</span>

                      <span className="font-semibold">
                        {recipient.firstName} {recipient.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500">Amount</span>

                      <span className="font-bold text-lg text-emerald-600">
                        ₦{Number(amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500">Description</span>

                      <span className="font-medium">
                        {description || "No description"}
                      </span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-slate-200">
                      <span className="text-slate-500">Status</span>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        Completed
                      </span>
                    </div>

                    <div className="flex justify-between pt-3">
                      <span className="text-slate-500">Date</span>

                      <span className="font-medium">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => {
                        setStep(0);
                        setRecipient(null);
                        setReceiverEmail("");
                        setAmount("");
                        setDescription("");
                      }}
                    >
                      New Transfer
                    </Button>

                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => downloadReceipt("receipt")}
                    >
                      Download Receipt
                    </Button>

                    <Button fullWidth onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
