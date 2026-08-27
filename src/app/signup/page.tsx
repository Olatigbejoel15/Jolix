"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Same as login — this is where the real Laravel signup call goes later.
    console.log(form);
  }

  return (
    <AuthLayout title="Create your account" subtitle="Ship faster and keep track of your history.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Full name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Joel Olatigbe"
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Phone number</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="0801 234 5678"
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
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
          Create account
        </button>
      </form>

      <p className="text-sm text-slate mt-6 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-beacon font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}