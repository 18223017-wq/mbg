"use client";
import { useState } from "react";
import { auditEvidence } from "@/lib/mockData";
import { Download, Eye, AlertCircle, CheckCircle, FileText, Image as ImageIcon, Filter } from "lucide-react";

const TYPE_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  "Foto Bukti": { bg: "#eff6ff", text: "#1e40af", icon: <ImageIcon size={14} /> },
  "Lab Result": { bg: "#f0fdf4", text: "#15803d", icon: <FileText size={14} /> },
  "Dokumentasi Inspeksi": { bg: "#fffbeb", text: "#b45309", icon: <FileText size={14} /> },
};

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Verified: { bg: "#dcfce7", text: "#14532d", icon: <CheckCircle size={14} /> },
  Flagged: { bg: "#fee2e2", text: "#b91c1c", icon: <AlertCircle size={14} /> },
};

interface Evidence {
  id: string;
  sppg: string;
  type: string;
  filename: string;
  inspector: string;
  uploadDate: string;
  uploadTime: string;
  location: string;
  fileSize: number;
  relatedFinding: string | null;
  description: string;
  status: "Verified" | "Flagged";
  notes: string;
}

export default function AuditEvidencePage() {
  const [searchSPPG, setSearchSPPG] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  const types = ["Semua", ...Array.from(new Set(auditEvidence.map((e) => e.type)))];
  const statuses = ["Semua", "Verified", "Flagged"];

  const filtered = auditEvidence.filter((e) => {
    const matchSearch = searchSPPG === "" || e.sppg.toLowerCase().includes(searchSPPG.toLowerCase()) || e.filename.toLowerCase().includes(searchSPPG.toLowerCase());
    const matchType = filterType === "Semua" || e.type === filterType;
    const matchStatus = filterStatus === "Semua" || e.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#071e49" }}>Audit Evidence Repository</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Kelola bukti inspeksi lapangan, hasil lab, dan dokumentasi kepatuhan dari seluruh SPPG
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total Evidence</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#071e49" }}>{auditEvidence.length}</p>
          <p className="text-xs text-gray-400 mt-1">File & dokumen terverifikasi</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Verified</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#22c55e" }}>{auditEvidence.filter((e) => e.status === "Verified").length}</p>
          <p className="text-xs text-gray-400 mt-1">Lolos validasi</p>
        </div>
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Flagged</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#ef4444" }}>{auditEvidence.filter((e) => e.status === "Flagged").length}</p>
          <p className="text-xs text-gray-400 mt-1">Membutuhkan review</p>
        </div>
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">SPPG With Evidence</p>
          <p className="text-3xl font-bold mt-2" style={{ color: "#3b82f6" }}>{new Set(auditEvidence.map((e) => e.sppg)).size}</p>
          <p className="text-xs text-gray-400 mt-1">Dengan bukti terkait</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Filter size={16} style={{ color: "#6b7280" }} />
          <input
            type="text"
            placeholder="Cari SPPG atau nama file..."
            value={searchSPPG}
            onChange={(e) => setSearchSPPG(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                {["ID", "SPPG", "Tipe", "Filename", "Inspector", "Upload", "Lokasi", "Ukuran", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((ev) => {
                  const typeColor = TYPE_COLORS[ev.type] || TYPE_COLORS["Foto Bukti"];
                  const statusColor = STATUS_COLORS[ev.status];
                  return (
                    <tr key={ev.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{ev.id}</td>
                      <td className="px-4 py-3 font-bold text-gray-800">{ev.sppg}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: typeColor.bg, color: typeColor.text }}>
                          {typeColor.icon}
                          {ev.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{ev.filename}</td>
                      <td className="px-4 py-3 text-gray-600">{ev.inspector}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ev.uploadDate} {ev.uploadTime}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">{ev.location}</td>
                      <td className="px-4 py-3 text-gray-600">{ev.fileSize} MB</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                          {statusColor.icon}
                          {ev.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEvidence(ev)}
                          className="p-1.5 rounded hover:bg-blue-100 transition-colors"
                          title="Preview"
                        >
                          <Eye size={16} className="text-blue-600" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-green-100 transition-colors" title="Download">
                          <Download size={16} className="text-green-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    Tidak ada evidence yang sesuai dengan filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setSelectedEvidence(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold" style={{ color: "#071e49" }}>Evidence Details</h2>
                <p className="text-xs text-gray-500 mt-0.5">{selectedEvidence.id}</p>
              </div>
              <button onClick={() => setSelectedEvidence(null)} className="text-gray-400 hover:text-gray-600 text-xl">
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">SPPG</p>
                  <p className="text-sm font-bold mt-1" style={{ color: "#071e49" }}>{selectedEvidence.sppg}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Type</p>
                  <p className="text-sm font-bold mt-1">{selectedEvidence.type}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Status</p>
                  <p className="text-sm font-bold mt-1" style={{ color: STATUS_COLORS[selectedEvidence.status].text }}>
                    {selectedEvidence.status}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Upload Date</p>
                  <p className="text-sm font-bold mt-1">{selectedEvidence.uploadDate} {selectedEvidence.uploadTime}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">File Information</p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="text-gray-600">Filename:</span> <span className="font-mono">{selectedEvidence.filename}</span></p>
                  <p className="text-sm"><span className="text-gray-600">Size:</span> <span className="font-bold">{selectedEvidence.fileSize} MB</span></p>
                  <p className="text-sm"><span className="text-gray-600">Inspector:</span> <span className="font-bold">{selectedEvidence.inspector}</span></p>
                  <p className="text-sm"><span className="text-gray-600">Location:</span> <span className="font-bold">{selectedEvidence.location}</span></p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedEvidence.description}</p>
              </div>

              {selectedEvidence.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Notes</p>
                  <p className="text-sm text-blue-800">{selectedEvidence.notes}</p>
                </div>
              )}

              {selectedEvidence.relatedFinding && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-yellow-900 mb-1">Related Finding</p>
                  <p className="text-sm text-yellow-800">{selectedEvidence.relatedFinding}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download size={16} /> Download
                </button>
                <button onClick={() => setSelectedEvidence(null)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
