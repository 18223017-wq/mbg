"use client";
import { sppgList, complianceData } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const CHECK = (v: boolean) =>
  v ? (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#92d05d" }}>✓</span>
  ) : (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#ef4444" }}>✗</span>
  );

const calcScore = (s: (typeof sppgList)[0]) => {
  let score = 0;
  if (s.slhs) score += 30;
  if (s.ipal) score += 25;
  if (s.sop) score += 20;
  if (s.sopDiterapkan) score += 15;
  score += 10; // assume halal & izin ok
  return score;
};

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>Compliance Engine — Pemantauan Kepatuhan Dokumen</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Monitoring kelengkapan dokumen wajib seluruh SPPG program MBG
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-red-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">SPPG dengan SLHS Lengkap</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#ef4444" }}>34</p>
          <p className="text-sm text-gray-400 mt-1">dari 8.583 SPPG terdata</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: "0.4%", backgroundColor: "#ef4444", minWidth: 4 }} />
          </div>
          <p className="text-xs text-red-500 font-bold mt-1">0.4% compliance</p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">SPPG dengan SOP Diterapkan</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#d97706" }}>312</p>
          <p className="text-sm text-gray-400 mt-1">dari 1.379 SPPG yang punya SOP</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: "22.6%", backgroundColor: "#f59e0b" }} />
          </div>
          <p className="text-xs text-yellow-600 font-bold mt-1">22.6% compliance</p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">SPPG dengan IPAL Standar</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#d97706" }}>1.069</p>
          <p className="text-sm text-gray-400 mt-1">dari 1.512 SPPG dihentikan sementara</p>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className="h-2 rounded-full" style={{ width: "70.7%", backgroundColor: "#f59e0b" }} />
          </div>
          <p className="text-xs text-yellow-600 font-bold mt-1">70.7% compliance</p>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Progress Kepatuhan per Dokumen</h2>
        <p className="text-xs text-gray-400 mb-4">Persentase SPPG compliant vs non-compliant per jenis dokumen</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={complianceData} margin={{ left: -20, right: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="dokumen" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="compliant" name="Compliant" stackId="a" fill="#92d05d" radius={[0, 0, 0, 0]} />
            <Bar dataKey="partial" name="Partial" stackId="a" fill="#f59e0b" />
            <Bar dataKey="nonCompliant" name="Non-Compliant" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Compliance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Compliance Checklist per SPPG</h2>
          <p className="text-xs text-gray-400 mt-0.5">Kelengkapan dokumen wajib per SPPG (sampel data)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["SPPG ID", "Nama", "SLHS", "IPAL", "SOP Punya", "SOP Diterapkan", "Sertif. Halal", "Izin Usaha", "Score", "Status"].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sppgList.map((row) => {
                const score = calcScore(row);
                return (
                  <tr key={row.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-3 py-3 font-mono text-xs text-gray-600">{row.id}</td>
                    <td className="px-3 py-3 font-medium text-gray-800 whitespace-nowrap max-w-[180px] truncate">{row.nama}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.slhs)}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.ipal)}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.sop)}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.sopDiterapkan)}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.skorRisiko < 50)}</td>
                    <td className="px-3 py-3 text-center">{CHECK(row.skorRisiko < 70)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${score}%`,
                              backgroundColor: score >= 80 ? "#92d05d" : score >= 50 ? "#f59e0b" : "#ef4444",
                            }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700">{score}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: score >= 80 ? "#dcfce7" : score >= 50 ? "#fef3c7" : "#fee2e2",
                          color: score >= 80 ? "#15803d" : score >= 50 ? "#92400e" : "#b91c1c",
                        }}
                      >
                        {score >= 80 ? "Compliant" : score >= 50 ? "Partial" : "Non-Compliant"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}