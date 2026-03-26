"use client";
import { Bell, ChevronRight, User } from "lucide-react";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/risk-scoring": "Risk Scoring",
  "/compliance": "Compliance Engine",
  "/anomaly": "Anomaly Detection",
  "/corrective-action": "Corrective Action",
  "/audit-evidence": "Audit Evidence",
};

export default function Header() {
  const pathname = usePathname();
  const page = breadcrumbMap[pathname] || "Dashboard";

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-400 font-medium">SISPENGAWAS MBG</span>
        <ChevronRight size={14} className="text-gray-300" />
        <span className="font-semibold" style={{ color: "#071e49" }}>{page}</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <span className="text-xs text-gray-400 font-medium hidden md:block">
          {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#ef4444" }}
          />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#071e49" }}>
            <User size={15} />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-800">Admin BGN</p>
            <p className="text-xs text-gray-400">Pusat Pengawasan</p>
          </div>
        </div>
      </div>
    </header>
  );
}