import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SocialLogin from "../../components/auth/SocialLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // TODO:
    // Call login API here
  };

  return (
    <AuthLayout>
      <AuthCard>
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome Back
            </h1>

            <p className="text-slate-500 leading-relaxed">
              Sign in to your account to manage your wallet, transfers and
              transactions securely.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
            >
              Forgot Password?
            </button>
          </div>

          <Button fullWidth>Sign In</Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <SocialLogin />

          <div className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              Create one
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
