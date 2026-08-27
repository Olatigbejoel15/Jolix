"use client";

import { useState, useEffect } from "react";

// Mock starting data — will be the actual logged-in user's details,
// fetched from Laravel, once real accounts exist.
const initialProfile = {
  name: "Joel Olatigbe",
  email: "joel@example.com",
  phone: "0801 234 5678",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof typeof profile, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Real save-to-Laravel call goes here later. For now, just show the
    // confirmation banner.
    setSaved(true);
  }

  // Runs automatically whenever `saved` changes. When it becomes true, we
  // start a 2.5-second timer that flips it back to false — giving us a
  // banner that shows itself, then quietly disappears on its own.
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2500);
      // Cleanup: if the component leaves the screen (or `saved` changes
      // again) before the 2.5s is up, cancel the old timer so it doesn't
      // fire late and cause confusing behavior.
      return () => clearTimeout(timer);
    }
  }, [saved]);

  // Turns "Joel Olatigbe" into "JO" — used for the avatar circle.
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-xl">
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Profile</h1>
      <p className="text-slate text-sm mb-8">Manage your account details.</p>

      <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6 md:p-8">
        {/* Avatar + name preview */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-ink/5">
          <div className="w-16 h-16 rounded-full bg-beacon/10 text-beacon font-display font-semibold text-xl flex items-center justify-center">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-ink">{profile.name}</p>
            <p className="text-slate text-sm">{profile.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Full name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Phone number</label>
            <input
              type="tel"
              required
              value={profile.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-6 py-2.5 rounded-lg"
            >
              Save changes
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-signal text-sm font-medium">
                <i className="bi bi-check-circle-fill"></i> Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}