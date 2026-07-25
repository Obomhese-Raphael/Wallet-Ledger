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

  const tx = transaction;

  function copyReference() {
    navigator.clipboard.writeText(tx.reference);

    toast.success("Reference copied");
  }

  function getTitle() {
    switch (tx.type) {
      case "deposit":
        return "Deposit";

      case "withdraw":
        return "Withdrawal";

      case "transfer_out":
        return "Transfer Sent";

      case "transfer_in":
        return "Transfer Received";

      default:
        return "Transaction";
    }
  }

  function getIcon() {
    switch (tx.type) {
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
    return tx.type === "deposit" || tx.type === "transfer_in"
      ? "text-emerald-600"
      : "text-red-500";
  }

  function amountPrefix() {
    return tx.type === "deposit" || tx.type === "transfer_in" ? "+" : "-";
  }

  function statusStyles() {
    switch (tx.status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";
    }
  }

  const isOutgoingTransfer = tx.type === "transfer_out";
  const isIncomingTransfer = tx.type === "transfer_in";

  const contactName = isOutgoingTransfer
    ? tx.recipientName
    : isIncomingTransfer
      ? tx.senderName
      : undefined;

  const contactEmail = isOutgoingTransfer
    ? tx.recipientEmail
    : isIncomingTransfer
      ? tx.senderEmail
      : undefined;

  const contactLabel = isOutgoingTransfer ? "Recipient" : "Sender";

  const dateObj = new Date(tx.createdAt);

  const dateStr = dateObj.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeStr = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleDownload() {
    generateReceipt({
      recipient: contactName ?? "-",
      email: contactEmail ?? "-",
      amount: tx.amount,
      description: tx.description,
      reference: tx.reference,
      status: tx.status,
      date: dateObj.toLocaleString(),
    });
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
              max-h-[90vh]
              w-[95%]
              max-w-lg
              -translate-x-1/2
              -translate-y-1/2
              overflow-y-auto
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="text-2xl font-bold">{getTitle()}</h2>

                <p className="text-slate-500">Transaction Details</p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Icon + Amount + Status */}
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="rounded-full bg-slate-100 p-5">
                    {getIcon()}
                  </div>
                </div>

                <h1 className={`mt-6 text-5xl font-extrabold ${amountColor()}`}>
                  {amountPrefix()}₦{tx.amount.toLocaleString()}
                </h1>

                <span
                  className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-semibold capitalize ${statusStyles()}`}
                >
                  {tx.status}
                </span>
              </div>

              {/* Recipient / Sender */}
              {(isOutgoingTransfer || isIncomingTransfer) && contactName && (
                <>
                  <hr className="border-slate-100" />

                  <div className="grid gap-4">
                    <InfoRow label={contactLabel} value={contactName} />

                    {contactEmail && (
                      <InfoRow label="Email" value={contactEmail} />
                    )}
                  </div>
                </>
              )}

              <hr className="border-slate-100" />

              {/* Core Details */}
              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="font-medium text-slate-500">Reference</span>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">
                      {tx.reference}
                    </span>

                    <button
                      onClick={copyReference}
                      className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                      aria-label="Copy reference"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="font-medium text-slate-500">Date</span>

                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{dateStr}</p>

                    <p className="text-sm text-slate-500">{timeStr}</p>
                  </div>
                </div>

                {tx.description && (
                  <InfoRow label="Description" value={tx.description} />
                )}
              </div>

              <hr className="border-slate-100" />

              {/* Download Receipt */}
              <Button fullWidth onClick={handleDownload}>
                <Download size={18} />
                Download Receipt
              </Button>
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

      <span className="text-right font-semibold text-slate-900">{value}</span>
    </div>
  );
}
