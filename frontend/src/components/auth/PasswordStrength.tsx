import { CheckCircle2, Circle } from "lucide-react";
import { getPasswordStrength } from "../../utils/passwordStrength";

interface Props {
  password: string;
}

export default function PasswordStrength({ password }: Props) {
  if (!password) return null;

  const score = getPasswordStrength(password);

  const checks = [
    {
      label: "At least 8 characters",
      passed: password.length >= 8,
    },
    {
      label: "Uppercase letter",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      passed: /[a-z]/.test(password),
    },
    {
      label: "Number",
      passed: /\d/.test(password),
    },
    {
      label: "Special character",
      passed: /[^A-Za-z0-9]/.test(password),
    },
  ];

  let color = "bg-red-500";
  let text = "Weak";

  if (score >= 3) {
    color = "bg-amber-500";
    text = "Medium";
  }

  if (score === 5) {
    color = "bg-emerald-500";
    text = "Strong";
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      {/* Progress Bar */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            Password Strength
          </span>

          <span
            className={`font-semibold ${
              score === 5
                ? "text-emerald-600"
                : score >= 3
                  ? "text-amber-600"
                  : "text-red-500"
            }`}
          >
            {text}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`${color} h-full transition-all duration-500`}
            style={{
              width: `${(score / 5) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2 text-sm">
            {check.passed ? (
              <CheckCircle2 size={16} className="text-emerald-500" />
            ) : (
              <Circle size={16} className="text-slate-300" />
            )}

            <span
              className={check.passed ? "text-slate-800" : "text-slate-500"}
            >
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
