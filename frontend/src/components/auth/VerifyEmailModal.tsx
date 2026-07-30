// components/auth/VerifyEmailModal.tsx
import { useState } from "react";
import { toast } from "sonner";
import { sendVerificationOtp, verifyEmail } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function VerifyEmailModal({ open, onClose }: Props) {
  const { updateUser } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  if (!open) return null;

  const handleSendCode = async () => {
    try {
      setSending(true);
      await sendVerificationOtp();
      setCodeSent(true);
      toast.success("Verification code sent to your email");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyEmail(otp);
      updateUser(res.data); // adjust if your response shape is different
      toast.success("Email verified successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-900">Verify your email</h2>
        <p className="mt-1 text-sm text-slate-500">
          We’ll send a 6-digit code to your email address.
        </p>

        {!codeSent ? (
          <div className="mt-6 space-y-4">
            <Button fullWidth loading={sending} onClick={handleSendCode}>
              {sending ? "Sending..." : "Send verification code"}
            </Button>
            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Enter 6-digit code
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <Button type="submit" fullWidth loading={loading}>
              {loading ? "Verifying..." : "Verify email"}
            </Button>

            <button
              type="button"
              onClick={handleSendCode}
              disabled={sending}
              className="w-full text-center text-sm text-indigo-600 hover:underline"
            >
              {sending ? "Sending..." : "Resend code"}
            </button>

            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
