"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Nothing happens here yet — this is where we'll call the real Laravel
    // login API once the backend exists. For now, this just stops the
    // browser from doing a full page reload on submit.
    console.log({ email, password });
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to manage your shipments.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate"
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-2.5 rounded-lg"
        >
          Log in
        </button>
      </form>

      <p className="text-sm text-slate mt-6 text-center">
        New to Jolix?{" "}
        <Link href="/signup" className="text-beacon font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}