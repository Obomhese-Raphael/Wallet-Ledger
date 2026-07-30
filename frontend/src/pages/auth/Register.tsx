import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";  

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SocialLogin from "../../components/auth/SocialLogin";

import { register } from "../../services/auth.service";

import PasswordStrength from "../../components/auth/PasswordStrength";

import {
  registerSchema,
  type RegisterFormValues,
} from "../../validations/auth.schema";

export default function Register() {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function onSubmit(data: RegisterFormValues) {
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Registration failed.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <div>
            <h1 className="text-3xl font-bold">Create Account</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                placeholder="Raphael"
                {...registerField("firstName")}
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Last Name"
                placeholder="Obomhese"
                {...registerField("lastName")}
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...registerField("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Phone Number"
              placeholder="08012345678"
              {...registerField("phoneNumber")}
            />

            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...registerField("password")}
            />

            <PasswordStrength password={password} />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...registerField("confirmPassword")}
            />

            {confirmPassword && (
              <p
                className={`text-sm font-medium ${
                  password === confirmPassword
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" fullWidth loading={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <SocialLogin />

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600">
              Sign In
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
