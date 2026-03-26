"use client";
import { useState } from "react";
import { X, Clock, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { correctiveActions } from "@/lib/mockData";

type CA = (typeof correctiveActions)[0];

const STATUS_COLUMNS = ["Temuan Baru", "Dalam Proses", "Menunggu Verifikasi", "Selesai"] as const;

const STATUS_CONFIG = {
  "Temuan Baru": { color: "#ef4444", bg: "#fee2e2", icon: AlertCircle, count: 0 },
  "Dalam Proses": { color: "#3b82f6", bg: "#eff6ff", icon: Loader, count: 0 },
  "Menunggu Verifikasi": { color: "#f59e0b", bg: "#fef3c7", icon: Clock, count: 0 },
  "Selesai": { color: "#22c55e", bg: "#dcfce7", icon: CheckCircle, count: 0 },
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{
            width: `${value}%`,
            backgroundColor: value === 100 ? "#22c55e" : value >= 50 ? "#3b82f6" : "#f59e0b",
          }}
        />
      </div>
      <span className="text-xs font-bold text-gray-600 w-8">{value}%</span>
    </div>
  );
}

function PrioritasBadge({ p }: { p: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Tinggi: { bg: "#fee2e2", text: "#b91c1c" },
    Sedang: { bg: "#fef3c7", text: "#92400e" },
    Rendah: { bg: "#dcfce7", text: "#14532d" },
  };
  const s = map[p] || map.Rendah;
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.text }}>
      {p}
    </span>
  );
}

const TIMELINE = [
  { step: "Temuan Terdeteksi", done: true },
  { step: "Notifikasi Dikirim", done: true },
  { step: "Respons Mitra", done: true },
  { step: "Verifikasi Lapangan", done: false },
  { step: "Selesai", done: false },
];

export default function CorrectiveActionPage() {
  const [filter, setFilter] = useState("Semua");
  const [modal, setModal] = useState<CA | null>(null);

  const counts = STATUS_COLUMNS.reduce(
    (acc, s) => ({ ...acc, [s]: correctiveActions.filter((c) => c.status === s).length }),
    {} as Record<string, number>
  );

  const filtered = correctiveActions.filter((c) => {
    if (filter === "Semua") return true;
    return c.prioritas === filter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>Corrective Action Tracking — Manajemen Tindak Lanjut Temuan</h1>
        <p className="text-sm text-gray-500 mt-0.5">Case management terstruktur untuk setiap temuan pengawasan</p>
      </div>

      {/* Kanban Summary */}
      <div className="grid grid-cols-4 gap-4">
        {STATUS_COLUMNS.map((s) => {
          const conf = STATUS_CONFIG[s];
          const Icon = conf.icon;
          return (
            <div key={s} className="bg-white rounded-xl border shadow-sm p-4" style={{ borderColor: conf.color + "33" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">{s}</span>
                <Icon size={16} style={{ color: conf.color }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: conf.color }}>{counts[s] || 0}</p>
              <p className="text-xs text-gray-400 mt-0.5">kasus aktif</p>
              <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: conf.color + "22" }}>
                <div className="h-1 rounded-full" style={{ width: `${Math.min(100, ((counts[s] || 0) / correctiveActions.length) * 100)}%`, backgroundColor: conf.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <span className="text-sm text-gray-500 font-medium">Filter prioritas:</span>
        {["Semua", "Tinggi", "Sedang", "Rendah"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={
              filter === f
                ? { backgroundColor: "#071e49", color: "#fff" }
                : { backgroundColor: "#f1f5f9", color: "#6b7280" }
            }
          >
            {f}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} kasus</span>
      </div>

      {/* Case Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Daftar Kasus Corrective Action</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["Case ID", "SPPG", "Temuan", "Kategori", "Ditugaskan ke", "Deadline", "Progress", "Prioritas", "Status", "Aksi"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">{row.id}</td>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">{row.sppg}</td>
                  <td className="px-3 py-3 text-gray-800 max-w-[200px]">
                    <span className="text-xs leading-snug block">{row.temuan}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{row.kategori}</span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{row.assignee}</td>
                  <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{row.deadline}</td>
                  <td className="px-3 py-3"><ProgressBar value={row.progress} /></td>
                  <td className="px-3 py-3"><PrioritasBadge p={row.prioritas} /></td>
                  <td className="px-3 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor:
                          row.status === "Temuan Baru" ? "#fee2e2" :
                          row.status === "Dalam Proses" ? "#eff6ff" :
                          row.status === "Menunggu Verifikasi" ? "#fef3c7" : "#dcfce7",
                        color:
                          row.status === "Temuan Baru" ? "#b91c1c" :
                          row.status === "Dalam Proses" ? "#1d4ed8" :
                          row.status === "Menunggu Verifikasi" ? "#92400e" : "#14532d",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => setModal(row)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:opacity-80"
                      style={{ backgroundColor: "#071e49", color: "#fff" }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-gray-400">{modal.id}</p>
                <h3 className="text-base font-bold mt-0.5" style={{ color: "#071e49" }}>{modal.temuan}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{modal.sppg} · {modal.kategori}</p>
              </div>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-gray-400">Assignee:</span> <span className="font-semibold text-gray-700">{modal.assignee}</span></div>
                <div><span className="text-gray-400">Deadline:</span> <span className="font-semibold text-gray-700">{modal.deadline}</span></div>
                <div><span className="text-gray-400">Progress:</span> <span className="font-semibold text-gray-700">{modal.progress}%</span></div>
                <div><span className="text-gray-400">Prioritas:</span> <PrioritasBadge p={modal.prioritas} /></div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Timeline Penanganan</p>
                <div className="space-y-3">
                  {TIMELINE.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                        style={{ backgroundColor: t.done ? "#92d05d" : "#e2e8f0" }}
                      >
                        {t.done ? "✓" : i + 1}
                      </div>
                      <span className="text-sm" style={{ color: t.done ? "#15803d" : "#9ca3af" }}>{t.step}</span>
                      {i < TIMELINE.length - 1 && (
                        <div className="flex-1 h-px" style={{ backgroundColor: t.done ? "#92d05d44" : "#e2e8f0" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Tutup</button>
              <button className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80" style={{ backgroundColor: "#92d05d" }}>Perbarui Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}