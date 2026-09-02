"use client";

import { useState } from "react";

// Mock data — will come from the real Laravel API later, filtered to
// users with role = "admin" specifically.
const initialAdmins = [
  { id: 1, name: "Amaka Eze", email: "amaka@jolix.com", status: "active" },
  { id: 2, name: "Tunde Bello", email: "tunde@jolix.com", status: "active" },
  { id: 3, name: "Ngozi Umeh", email: "ngozi@jolix.com", status: "inactive" },
];

const emptyForm = { name: "", email: "", password: "" };

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    // Real creation calls Laravel later — POST /api/admins, role forced to
    // "admin" server-side, only reachable by an authenticated super_admin.
    const newAdmin = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      status: "active",
    };
    setAdmins((prev) => [newAdmin, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  }

  function toggleStatus(id: number) {
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a))
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink mb-1">Manage Admins</h1>
          <p className="text-slate text-sm">Control who has access to the Admin dashboard.</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-circle-fill"}`}></i>
          {showForm ? "Cancel" : "Add Admin"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddAdmin}
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
            type="email"
            required
            placeholder="Email address"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
          <input
            type="password"
            required
            placeholder="Temporary password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
          <button
            type="submit"
            className="bg-ink hover:bg-ink-2 transition-colors text-white text-sm font-medium rounded-lg py-2"
          >
            Create admin
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-ink/5 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-left text-xs text-slate uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-ink/5 last:border-0 hover:bg-cloud transition-colors">
                <td className="px-5 py-3.5 text-ink font-medium">{admin.name}</td>
                <td className="px-5 py-3.5 text-slate">{admin.email}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      admin.status === "active" ? "bg-signal/10 text-signal" : "bg-ink/10 text-ink/50"
                    }`}
                  >
                    {admin.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => toggleStatus(admin.id)}
                    className="text-route text-xs font-medium hover:underline"
                  >
                    {admin.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}