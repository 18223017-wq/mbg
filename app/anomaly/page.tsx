"use client";
import { useState } from "react";
import { biayaAnomalyData, biayaAnomalyTable, volumeScatterData, leadTimeData, nutrisiData, nutrisiBarData } from "@/lib/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ScatterChart, Scatter, BarChart, Bar,
} from "recharts";

const TABS = ["Anomali Biaya", "Anomali Volume Distribusi", "Lead Time Distribusi", "Penyimpangan Kandungan Gizi"];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    Anomali: { bg: "#fee2e2", text: "#b91c1c" },
    Perhatian: { bg: "#fef3c7", text: "#92400e" },
    Normal: { bg: "#dcfce7", text: "#14532d" },
    Menyimpang: { bg: "#fee2e2", text: "#b91c1c" },
    Tinggi: { bg: "#fee2e2", text: "#b91c1c" },
    Sedang: { bg: "#fef3c7", text: "#92400e" },
    Rendah: { bg: "#dcfce7", text: "#14532d" },
  };
  const s = map[status] || map.Normal;
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

const CustomDot = (props: { cx?: number; cy?: number; payload?: { anomaly?: boolean } }) => {
  const { cx = 0, cy = 0, payload } = props;
  if (payload?.anomaly) {
    return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
  }
  return <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />;
};

export default function AnomalyPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>Anomaly Detection — Deteksi Penyimpangan Operasional</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Deteksi otomatis menggunakan Z-Score dan threshold berbasis data historis
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit flex-wrap">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === i
                ? { backgroundColor: "#071e49", color: "#fff" }
                : { color: "#6b7280", backgroundColor: "transparent" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0: Anomali Biaya */}
      {activeTab === 0 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Tren Biaya per Porsi vs Baseline</h2>
            <p className="text-xs text-gray-400 mb-4">Baseline: Rp 10.000/porsi — Titik merah = anomali terdeteksi</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={biayaAnomalyData} margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} domain={[8000, 15000]} />
                <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconType="line" wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine y={10000} stroke="#f59e0b" strokeDasharray="6 3" label={{ value: "Baseline", fontSize: 10, fill: "#f59e0b" }} />
                <Line type="monotone" dataKey="baseline" stroke="#f59e0b" strokeDasharray="6 3" dot={false} name="Baseline" strokeWidth={1.5} />
                <Line type="monotone" dataKey="aktual" stroke="#3b82f6" dot={<CustomDot />} name="Biaya Aktual" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Detail Anomali Biaya per SPPG</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    {["SPPG ID", "Periode", "Biaya Aktual/Porsi", "Baseline", "Deviasi (%)", "Z-Score", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {biayaAnomalyTable.map((row) => (
                    <tr key={row.sppgId + row.periode} className="hover:bg-red-50/10">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{row.sppgId}</td>
                      <td className="px-4 py-3 text-gray-700">{row.periode}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">Rp {row.aktual.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3 text-gray-500">Rp {row.baseline.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold" style={{ color: row.deviasi > 20 ? "#ef4444" : row.deviasi > 10 ? "#f59e0b" : "#22c55e" }}>
                          +{row.deviasi.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-gray-700">{row.zScore.toFixed(1)}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Volume */}
      {activeTab === 1 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Volume Dilaporkan vs Volume Terverifikasi</h2>
            <p className="text-xs text-gray-400 mb-4">Titik jauh dari diagonal = potensi manipulasi data pelaporan</p>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dilaporkan" name="Dilaporkan" type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: "Volume Dilaporkan (porsi)", position: "insideBottom", offset: -5, fontSize: 11 }} />
                <YAxis dataKey="terverifikasi" name="Terverifikasi" type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number, n: string) => [`${v} porsi`, n]} />
                <Scatter
                  data={volumeScatterData}
                  shape={(props: { cx?: number; cy?: number; payload?: { anomaly?: boolean } }) => {
                    const { cx = 0, cy = 0, payload } = props;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={payload?.anomaly ? 8 : 5}
                        fill={payload?.anomaly ? "#ef4444" : "#3b82f6"}
                        fillOpacity={0.8}
                        stroke="#fff"
                        strokeWidth={1.5}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-yellow-600 font-bold text-lg">⚠</span>
            <div>
              <p className="text-sm font-bold text-yellow-800">3 titik merah terdeteksi sebagai anomali</p>
              <p className="text-xs text-yellow-700 mt-0.5">SPPG-DKI-002, SPPG-JI-001, SPPG-SLW-001 menunjukkan selisih &gt;15% antara volume dilaporkan dan terverifikasi</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Lead Time */}
      {activeTab === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Lead Time Rencana vs Aktual per SPPG</h2>
            <p className="text-xs text-gray-400 mb-4">Dalam jam — standar distribusi maksimal 2 jam</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={leadTimeData} margin={{ left: -20, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sppg" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `${v} jam`} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine y={2} stroke="#ef4444" strokeDasharray="4 2" label={{ value: "Maks 2j", fontSize: 10, fill: "#ef4444" }} />
                <Bar dataKey="rencana" name="Lead Time Rencana" fill="#b5e0ea" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aktual" name="Lead Time Aktual" fill="#071e49" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Detail Lead Time per Rute</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    {["SPPG", "Lead Time Rencana", "Lead Time Aktual", "Deviasi (%)", "Risiko"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leadTimeData.map((row) => (
                    <tr key={row.sppg} className="hover:bg-blue-50/10">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{row.sppg}</td>
                      <td className="px-4 py-3 text-gray-700">{row.rencana} jam</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: row.aktual > 2 ? "#ef4444" : "#22c55e" }}>{row.aktual} jam</td>
                      <td className="px-4 py-3 font-bold" style={{ color: row.deviasi > 50 ? "#ef4444" : row.deviasi > 20 ? "#f59e0b" : "#22c55e" }}>+{row.deviasi}%</td>
                      <td className="px-4 py-3"><StatusBadge status={row.risiko} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Gizi */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-bold mb-1" style={{ color: "#071e49" }}>Kandungan Gizi: Menu Direncanakan vs Hasil Lab</h2>
            <p className="text-xs text-gray-400 mb-4">Rata-rata agregat semua SPPG yang telah diuji lab</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={nutrisiBarData} margin={{ left: -20, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="kategori" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="rencana" name="Direncanakan" fill="#92d05d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aktual" name="Hasil Lab" fill="#071e49" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold" style={{ color: "#071e49" }}>Detail Penyimpangan Gizi per Menu</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    {["Menu", "SPPG", "Kalori Rencana", "Kalori Aktual", "Protein Dev (%)", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {nutrisiData.map((row) => (
                    <tr key={row.menu} className="hover:bg-blue-50/10">
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[180px] truncate">{row.menu}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{row.sppg}</td>
                      <td className="px-4 py-3 text-gray-700">{row.kaloriRencana} kcal</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: row.kaloriAktual < row.kaloriRencana * 0.9 ? "#ef4444" : "#22c55e" }}>{row.kaloriAktual} kcal</td>
                      <td className="px-4 py-3 font-bold" style={{ color: row.proteinDev < -10 ? "#ef4444" : row.proteinDev < 0 ? "#f59e0b" : "#22c55e" }}>{row.proteinDev.toFixed(1)}%</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}