"use client";
import { useState } from "react";
import { Search, ExternalLink, Info } from "lucide-react";
import RiskBadge from "@/components/RiskBadge";
import { sppgList } from "@/lib/mockData";

const FORMULA = [
  { label: "Compliance Score", weight: 30, color: "#92d05d" },
  { label: "Financial Anomaly Score", weight: 25, color: "#ef4444" },
  { label: "Field Evidence Score", weight: 20, color: "#3b82f6" },
  { label: "Historical Findings", weight: 15, color: "#f59e0b" },
  { label: "Nutrition Deviation", weight: 10, color: "#8b5cf6" },
];

const CHECK = (v: boolean) =>
  v ? (
    <span className="text-green-600 font-bold">✓</span>
  ) : (
    <span className="text-red-500 font-bold">✗</span>
  );

export default function RiskScoringPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");
  const [filterProvinsi, setFilterProvinsi] = useState("Semua");

  const provinces = ["Semua", ...Array.from(new Set(sppgList.map((s) => s.provinsi)))];

  const filtered = sppgList.filter((s) => {
    const matchSearch =
      search === "" ||
      s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "Semua" || s.level === filterLevel;
    const matchProvinsi = filterProvinsi === "Semua" || s.provinsi === filterProvinsi;
    return matchSearch && matchLevel && matchProvinsi;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>Risk Scoring Engine</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Setiap SPPG mendapatkan skor risiko 0–100 berdasarkan 5 dimensi pengawasan
        </p>
      </div>

      {/* Formula Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} style={{ color: "#071e49" }} />
          <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Formula Risk Score</h2>
          <span className="text-xs text-gray-400">— Komposit berbobot 5 dimensi</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {FORMULA.map((f) => (
            <div key={f.label} className="flex-1 min-w-[150px] rounded-lg p-3 border border-gray-100" style={{ backgroundColor: "#f8fafc" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">{f.label}</span>
                <span className="text-sm font-bold" style={{ color: f.color }}>{f.weight}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: `${f.weight * 3.33}%`, backgroundColor: f.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2"
            style={{ "--tw-ring-color": "#92d05d" } as React.CSSProperties}
            value={filterProvinsi}
            onChange={(e) => setFilterProvinsi(e.target.value)}
          >
            {provinces.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <select
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            {["Semua", "Tinggi", "Sedang", "Rendah"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau ID SPPG..."
              className="flex-1 text-sm outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} SPPG ditemukan</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Daftar SPPG — Penilaian Risiko</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["No", "SPPG ID", "Nama SPPG", "Provinsi", "Skor Risiko", "Level", "SLHS", "IPAL", "SOP", "Last Inspeksi", "Aksi"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((row, i) => (
                <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-3 py-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">{row.id}</td>
                  <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap">{row.nama}</td>
                  <td className="px-3 py-3 text-gray-600 text-xs whitespace-nowrap">{row.provinsi}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${row.skorRisiko}%`,
                            backgroundColor: row.skorRisiko >= 70 ? "#ef4444" : row.skorRisiko >= 40 ? "#f59e0b" : "#22c55e",
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{row.skorRisiko}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <RiskBadge level={row.level as "Tinggi" | "Sedang" | "Rendah"} />
                  </td>
                  <td className="px-3 py-3 text-center">{CHECK(row.slhs)}</td>
                  <td className="px-3 py-3 text-center">{CHECK(row.ipal)}</td>
                  <td className="px-3 py-3 text-center">{CHECK(row.sop && row.sopDiterapkan)}</td>
                  <td className="px-3 py-3 text-xs text-gray-500 whitespace-nowrap">{row.lastInspeksi}</td>
                  <td className="px-3 py-3">
                    <button
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:opacity-80"
                      style={{ backgroundColor: "#071e49", color: "#fff" }}
                    >
                      <ExternalLink size={11} />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}