interface RiskBadgeProps {
  level: "Tinggi" | "Sedang" | "Rendah" | "Kritis";
  score?: number;
}

const levelMap = {
  Kritis: { bg: "#fee2e2", text: "#991b1b", dot: "#dc2626" },
  Tinggi: { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
  Sedang: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  Rendah: { bg: "#dcfce7", text: "#14532d", dot: "#22c55e" },
};

export default function RiskBadge({ level, score }: RiskBadgeProps) {
  const s = levelMap[level] || levelMap["Rendah"];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.dot }} />
      {level}
      {score !== undefined && <span className="font-bold">({score})</span>}
    </span>
  );
}