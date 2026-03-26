"use client";
import { Users, AlertTriangle, FileX, Wrench, ExternalLink } from "lucide-react";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import { provinsiRiskData, recentAlerts } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const PIE_DATA = [
  { name: "Compliant", value: 34 },
  { name: "Partial", value: 41 },
  { name: "Non-Compliant", value: 25 },
];
const PIE_COLORS = ["#92d05d", "#f59e0b", "#ef4444"];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>
          Dashboard Pengawasan MBG — Sistem Berbasis Risiko
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Enhancement layer untuk ekosistem digital Badan Gizi Nasional · Data per 26 Maret 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total SPPG Aktif" value="25.020" subtitle="Per 24 Maret 2026" icon={Users} color="green" />
        <StatCard title="SPPG Risiko Tinggi" value="1.512" subtitle="Perlu tindak segera" icon={AlertTriangle} color="red" trend={{ value: "+87 minggu ini", up: true }} />
        <StatCard title="SPPG Belum SLHS" value="1.043" subtitle="Di Pulau Jawa" icon={FileX} color="yellow" />
        <StatCard title="Corrective Action Aktif" value="287" subtitle="Kasus dalam penanganan" icon={Wrench} color="gold" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Bar Chart */}
        <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>
            Distribusi Skor Risiko SPPG per Provinsi
          </h2>
          <p className="text-xs text-gray-400 mb-4">Top 10 provinsi berdasarkan jumlah SPPG</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={provinsiRiskData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="provinsi" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="tinggi" name="Risiko Tinggi" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
              <Bar dataKey="sedang" name="Risiko Sedang" stackId="a" fill="#f59e0b" />
              <Bar dataKey="rendah" name="Risiko Rendah" stackId="a" fill="#92d05d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Status Kepatuhan Dokumen</h2>
          <p className="text-xs text-gray-400 mb-2">Dari total 8.583 SPPG terdata</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {PIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {PIE_DATA.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: PIE_COLORS[i] }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Peringatan Terkini</h2>
            <p className="text-xs text-gray-400">SPPG dengan risiko terdeteksi dalam 7 hari terakhir</p>
          </div>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
          >
            5 Peringatan Aktif
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc" }}>
                {["SPPG ID", "Nama SPPG", "Lokasi", "Risk Score", "Isu Terdeteksi", "Status", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentAlerts.map((row) => (
                <tr key={row.sppgId} className="hover:bg-red-50/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{row.sppgId}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{row.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{row.lokasi}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
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
                  <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{row.issue}</td>
                  <td className="px-4 py-3">
                    <RiskBadge level={row.status as "Tinggi" | "Kritis"} />
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors hover:opacity-80"
                      style={{ backgroundColor: "#071e49", color: "#fff" }}>
                      <ExternalLink size={12} />
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