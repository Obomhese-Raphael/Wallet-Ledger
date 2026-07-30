// pages/profile/Profile.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VerifyEmailModal from "../../components/auth/VerifyEmailModal";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleLogout = () => {
    setIsLoggingOut(true);
    toast.success("Logging out...");

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 3000);
  };

  const fullName = `${user.firstName} ${user.lastName}`;
  const avatarUrl =
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName,
    )}&background=6366f1&color=fff&size=128`;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={fullName}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">{fullName}</h1>
            <p className="text-slate-500">{user.email}</p>

            <span
              className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                user.isVerified
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {user.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>

        {/* Personal Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem label="First Name" value={user.firstName} />
            <InfoItem label="Last Name" value={user.lastName} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Phone Number" value={user.phoneNumber} />
          </div>
        </section>

        {/* Account */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Account</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Member since</span>
              <span className="font-medium text-slate-900">{memberSince}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Account status</span>
              <span
                className={`font-medium ${
                  user.isVerified ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {user.isVerified ? "Verified" : "Pending verification"}
              </span>
            </div>
          </div>

          {!user.isVerified && (
            <Button
              variant="primary"
              fullWidth
              className="mt-6"
              onClick={() => setShowVerifyModal(true)}
            >
              Verify Email
            </Button>
          )}
        </section>

        {/* Security */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Security</h2>

          <Button
            variant="primary"
            fullWidth
            onClick={() => toast("Change password coming soon")}
          >
            Change Password
          </Button>

          <Button
            variant="danger"
            fullWidth
            loading={isLoggingOut}
            onClick={handleLogout}
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </section>
      </div>

      <VerifyEmailModal
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
    </DashboardLayout>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}
