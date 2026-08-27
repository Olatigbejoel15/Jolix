"use client";

import { useState } from "react";

// Mock data — will come from the real Laravel API later, including real
// completed-delivery counts and ratings computed from actual history.
const initialDrivers = [
  { id: 1, name: "David Okafor", phone: "0809 876 5432", vehicle: "Van", status: "active", currentDelivery: "ST-2026-84921", completed: 142, rating: 4.8 },
  { id: 2, name: "Chinedu Kalu", phone: "0803 221 9087", vehicle: "Car", status: "active", currentDelivery: "ST-2026-84701", completed: 98, rating: 4.6 },
  { id: 3, name: "Musa Ibrahim", phone: "0812 445 6621", vehicle: "Motorcycle", status: "active", currentDelivery: null, completed: 210, rating: 4.9 },
  { id: 4, name: "Grace Titus", phone: "0705 998 3312", vehicle: "Van", status: "inactive", currentDelivery: null, completed: 56, rating: 4.4 },
];

const emptyForm = { name: "", phone: "", vehicle: "Motorcycle" };

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleStatus(id: number) {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d))
    );
  }

  function handleAddDriver(e: React.FormEvent) {
    e.preventDefault();
    const newDriver = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      vehicle: form.vehicle,
      status: "active",
      currentDelivery: null,
      completed: 0,
      rating: 0,
    };
    setDrivers((prev) => [newDriver, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink mb-1">Drivers</h1>
          <p className="text-slate text-sm">Manage your driver network.</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-circle-fill"}`}></i>
          {showForm ? "Cancel" : "Add Driver"}
        </button>
      </div>

      {/* Add driver form — only rendered when toggled open */}
      {showForm && (
        <form
          onSubmit={handleAddDriver}
          className="bg-white rounded-xl border border-ink/5 shadow-sm p-5 mb-6 grid sm:grid-cols-4 gap-3"
        >
          <input
            type="text"
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
          <select
            value={form.vehicle}
            onChange={(e) => updateField("vehicle", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-beacon/50"
          >
            <option value="Motorcycle">Motorcycle</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
          </select>
          <button
            type="submit"
            className="bg-ink hover:bg-ink-2 transition-colors text-white text-sm font-medium rounded-lg py-2"
          >
            Save driver
          </button>
        </form>
      )}

      {/* Driver cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-xl border border-ink/5 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-ink">{driver.name}</p>
                <p className="text-slate text-xs mt-0.5">{driver.phone} · {driver.vehicle}</p>
              </div>
              <span
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                  driver.status === "active" ? "bg-signal/10 text-signal" : "bg-ink/10 text-ink/50"
                }`}
              >
                {driver.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate mb-2">
              <i className="bi bi-truck"></i>
              {driver.currentDelivery ? (
                <span>On <span className="font-mono text-ink">{driver.currentDelivery}</span></span>
              ) : (
                <span>No active delivery</span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-slate mb-5">
              <span className="flex items-center gap-1.5">
                <i className="bi bi-check-circle-fill text-signal"></i> {driver.completed} completed
              </span>
              {driver.rating > 0 && (
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-star-fill text-beacon"></i> {driver.rating}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleStatus(driver.id)}
              className={`w-full text-sm font-medium py-2 rounded-lg transition-colors ${
                driver.status === "active"
                  ? "border border-ink/15 text-ink hover:border-ink/30"
                  : "bg-signal hover:opacity-90 text-white"
              }`}
            >
              {driver.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}