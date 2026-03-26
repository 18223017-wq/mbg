"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  CheckSquare,
  Search,
  Wrench,
  FolderOpen,
  Settings,
  User,
  Bell,
  Shield,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Risk Scoring", icon: AlertTriangle, href: "/risk-scoring" },
  { label: "Compliance Engine", icon: CheckSquare, href: "/compliance" },
  { label: "Anomaly Detection", icon: Search, href: "/anomaly" },
  { label: "Corrective Action", icon: Wrench, href: "/corrective-action" },
  { label: "Audit Evidence", icon: FolderOpen, href: "/audit-evidence" },
];

const sysItems = [
  { label: "Pengaturan", icon: Settings, href: "#" },
  { label: "Profil", icon: User, href: "#" },
  { label: "Notifikasi", icon: Bell, href: "#", badge: 5 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40" style={{ backgroundColor: "#071e49" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#92d05d" }}>
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">SISPENGAWAS</p>
          <p className="font-semibold text-xs leading-tight" style={{ color: "#92d05d" }}>MBG — BGN</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          Navigasi Utama
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative group ${
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  style={active ? { backgroundColor: "rgba(146,208,93,0.12)" } : {}}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r"
                      style={{ backgroundColor: "#92d05d" }}
                    />
                  )}
                  <item.icon
                    size={18}
                    style={active ? { color: "#92d05d" } : {}}
                    className={active ? "" : "group-hover:text-white/80"}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-2 mt-6" style={{ color: "rgba(255,255,255,0.35)" }}>
          Sistem
        </p>
        <ul className="space-y-0.5">
          {sysItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150"
              >
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: "#ef4444", color: "#fff" }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-white/30 text-center">v1.0.0 — Hackathon 2026</p>
        <p className="text-xs text-white/20 text-center mt-0.5">Badan Gizi Nasional</p>
      </div>
    </aside>
  );
}