"use client";

import { useState, useEffect } from "react";

// Mock starting data — will be the real logged-in driver's details, fetched
// from Laravel, once real accounts exist.
const initialProfile = {
  name: "David Okafor",
  email: "david@example.com",
  phone: "0809 876 5432",
  vehicleType: "van",
  plateNumber: "LND-442-XY",
};

export default function DriverProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof typeof profile, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
  }

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-xl">
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Profile</h1>
      <p className="text-slate text-sm mb-8">Manage your driver account and vehicle details.</p>

      <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6 md:p-8">
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
          <p className="text-sm font-semibold text-ink">Personal information</p>

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

          <p className="text-sm font-semibold text-ink pt-2">Vehicle information</p>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Vehicle type</label>
            <select
              value={profile.vehicleType}
              onChange={(e) => updateField("vehicleType", e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            >
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
              <option value="motorbike">Motorbike</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Plate number</label>
            <input
              type="text"
              required
              value={profile.plateNumber}
              onChange={(e) => updateField("plateNumber", e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-beacon px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-beacon/90"
            >
              Save changes
            </button>

            {saved && <span className="text-sm text-green-600">Saved</span>}
          </div>
        </form>
      </div>
    </div>
  );
}