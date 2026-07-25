import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  Download,
  X,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { generateReceipt } from "../../utils/generateReceipt";

import type { Transaction } from "../../types/transaction";

interface Props {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionDetailsModal({
  open,
  transaction,
  onClose,
}: Props) {
  if (!transaction) return null;

  function copyReference() {
    if (!transaction) return;

    navigator.clipboard.writeText(transaction.reference);

    toast.success("Reference copied");
  }

  function getIcon() {
    switch (transaction.type) {
      case "deposit":
        return <ArrowDownCircle size={64} className="text-emerald-600" />;

      case "withdraw":
        return <ArrowUpCircle size={64} className="text-red-500" />;

      case "transfer_in":
        return <ArrowRightLeft size={64} className="text-sky-600" />;

      case "transfer_out":
        return <ArrowRightLeft size={64} className="text-indigo-600" />;
    }
  }

  function amountColor() {
    return transaction.type === "deposit" || transaction.type === "transfer_in"
      ? "text-emerald-600"
      : "text-red-500";
  }

  function amountPrefix() {
    return transaction.type === "deposit" || transaction.type === "transfer_in"
      ? "+"
      : "-";
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
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
              duration: 0.2,
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[95%]
              max-w-lg
              -translate-x-1/2
              -translate-y-1/2
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-2xl font-bold">Transaction Details</h2>

                <p className="text-slate-500">
                  {transaction.type.replace("_", " ")}
                </p>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="rounded-full bg-slate-100 p-5">
                    {getIcon()}
                  </div>
                </div>

                <p className="mt-6 text-slate-500">Transaction Amount</p>

                <h1 className={`mt-2 text-5xl font-extrabold ${amountColor()}`}>
                  {amountPrefix()}₦{transaction.amount.toLocaleString()}
                </h1>
              </div>

              <div className="grid gap-4">
                <InfoRow label="Reference" value={transaction.reference} />

                <InfoRow label="Description" value={transaction.description} />

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="font-medium text-slate-500">Status</span>

                  <span
                    className={`
      rounded-full
      px-4
      py-1
      text-sm
      font-semibold

      ${
        transaction.status === "completed"
          ? "bg-emerald-100 text-emerald-700"
          : transaction.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
      }
    `}
                  >
                    {transaction.status}
                  </span>
                </div>

                <InfoRow
                  label="Date"
                  value={new Date(transaction.createdAt).toLocaleString()}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={copyReference}>
                  <Copy size={18} />
                  Copy Ref
                </Button>

                <Button
                  onClick={() =>
                    generateReceipt({
                      recipient: "-",
                      email: "-",
                      amount: transaction.amount,
                      description: transaction.description,
                      reference: transaction.reference,
                      status: transaction.status,
                      date: new Date(transaction.createdAt).toLocaleString(),
                    })
                  }
                >
                  <Download size={18} />
                  Receipt
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
      <span className="font-medium text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900 text-right">{value}</span>
    </div>
  );
}
