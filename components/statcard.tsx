import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: "green" | "red" | "yellow" | "gold" | "blue";
  trend?: { value: string; up: boolean };
}

const colorMap = {
  green: { bg: "#f0fdf4", icon: "#92d05d", border: "#bbf7d0", text: "#15803d" },
  red: { bg: "#fef2f2", icon: "#ef4444", border: "#fecaca", text: "#dc2626" },
  yellow: { bg: "#fffbeb", icon: "#f59e0b", border: "#fde68a", text: "#d97706" },
  gold: { bg: "#fefce8", icon: "#d1b06c", border: "#fef08a", text: "#92400e" },
  blue: { bg: "#eff6ff", icon: "#3b82f6", border: "#bfdbfe", text: "#1d4ed8" },
};

export default function StatCard({ title, value, subtitle, icon: Icon, color = "blue", trend }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div
      className="bg-white rounded-xl p-5 border flex items-start gap-4 shadow-sm"
      style={{ borderColor: c.border }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: c.bg }}
      >
        <Icon size={22} style={{ color: c.icon }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: "#071e49" }}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        {trend && (
          <p className="text-xs font-semibold mt-1" style={{ color: trend.up ? "#ef4444" : "#22c55e" }}>
            {trend.up ? "▲" : "▼"} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}