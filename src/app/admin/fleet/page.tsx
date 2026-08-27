"use client";

import { useState } from "react";

// Mock data — will come from the real Laravel API later. Driver names
// here mirror the ones on the Drivers page — once the backend exists,
// this list would come from the same real drivers table instead of
// being retyped separately.
const driverNames = ["Unassigned", "David Okafor", "Chinedu Kalu", "Musa Ibrahim", "Grace Titus"];

const initialVehicles = [
  { id: 1, plate: "LND-442-XY", type: "Van", driver: "David Okafor", status: "active", lastService: "2026-07-10" },
  { id: 2, plate: "ABJ-118-KL", type: "Car", driver: "Chinedu Kalu", status: "active", lastService: "2026-06-28" },
  { id: 3, plate: "LGS-905-QP", type: "Motorcycle", driver: "Musa Ibrahim", status: "maintenance", lastService: "2026-08-20" },
  { id: 4, plate: "LND-330-RT", type: "Van", driver: "Unassigned", status: "idle", lastService: "2026-05-15" },
];

const initialMaintenanceLog = [
  { vehicle: "LGS-905-QP", note: "Brake pad replacement", date: "2026-08-20" },
  { vehicle: "ABJ-118-KL", note: "Routine oil change", date: "2026-06-28" },
];

const emptyForm = { plate: "", type: "Motorcycle" };

const statusStyles: Record<string, string> = {
  active: "bg-signal/10 text-signal",
  maintenance: "bg-beacon/10 text-beacon",
  idle: "bg-ink/10 text-ink/50",
};

export default function AdminFleetPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [maintenanceLog, setMaintenanceLog] = useState(initialMaintenanceLog);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [maintenanceNote, setMaintenanceNote] = useState<Record<number, string>>({});

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddVehicle(e: React.FormEvent) {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      plate: form.plate,
      type: form.type,
      driver: "Unassigned",
      status: "idle",
      lastService: new Date().toISOString().split("T")[0],
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  }

  function assignDriver(id: number, driver: string) {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, driver, status: driver === "Unassigned" ? "idle" : "active" } : v))
    );
  }

  function logMaintenance(vehicle: typeof vehicles[number]) {
    const note = maintenanceNote[vehicle.id];
    if (!note) return;

    setMaintenanceLog((prev) => [
      { vehicle: vehicle.plate, note, date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicle.id ? { ...v, status: "maintenance", lastService: new Date().toISOString().split("T")[0] } : v
      )
    );
    setMaintenanceNote((prev) => ({ ...prev, [vehicle.id]: "" }));
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink mb-1">Fleet</h1>
          <p className="text-slate text-sm">Manage vehicles, assignments, and maintenance.</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-circle-fill"}`}></i>
          {showForm ? "Cancel" : "Add Vehicle"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddVehicle}
          className="bg-white rounded-xl border border-ink/5 shadow-sm p-5 mb-6 grid sm:grid-cols-3 gap-3"
        >
          <input
            type="text"
            required
            placeholder="Plate number"
            value={form.plate}
            onChange={(e) => updateField("plate", e.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
          />
          <select
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
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
            Save vehicle
          </button>
        </form>
      )}

      {/* Vehicle cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-xl border border-ink/5 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono font-semibold text-ink">{vehicle.plate}</p>
                <p className="text-slate text-xs mt-0.5">{vehicle.type}</p>
              </div>
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[vehicle.status]}`}>
                {vehicle.status}
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-slate mb-1.5">Assigned driver</label>
              <select
                value={vehicle.driver}
                onChange={(e) => assignDriver(vehicle.id, e.target.value)}
                className="w-full text-sm border border-ink/15 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-beacon/50"
              >
                {driverNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <p className="text-xs text-slate mb-4">
              Last serviced: <span className="text-ink">{vehicle.lastService}</span>
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Log maintenance note..."
                value={maintenanceNote[vehicle.id] || ""}
                onChange={(e) => setMaintenanceNote((prev) => ({ ...prev, [vehicle.id]: e.target.value }))}
                className="flex-1 text-sm border border-ink/15 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-beacon/50"
              />
              <button
                onClick={() => logMaintenance(vehicle)}
                className="bg-ink hover:bg-ink-2 transition-colors text-white text-sm px-3 rounded-lg"
              >
                <i className="bi bi-wrench"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Maintenance history */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm">
        <div className="px-5 py-4 border-b border-ink/5">
          <p className="font-semibold text-ink text-sm">Maintenance history</p>
        </div>
        <ul>
          {maintenanceLog.map((entry, i) => (
            <li key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-ink/5 last:border-0">
              <div>
                <span className="font-mono text-sm text-ink">{entry.vehicle}</span>
                <span className="text-slate text-sm ml-3">{entry.note}</span>
              </div>
              <span className="text-slate text-xs">{entry.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}