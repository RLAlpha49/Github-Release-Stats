import { ReleaseAsset } from "@/types/github";
import { formatNumber } from "@/utils/formatters";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "@/components/Charts";

interface AssetChartProps {
  assets: ReleaseAsset[];
}

export function AssetChart({ assets }: AssetChartProps) {
  if (!assets || assets.length === 0) return null;

  const chartData = assets.map(a => ({ name: a.name, downloads: a.download_count }));

  return (
    <div className="h-56 w-full rounded-md border border-gray-200 dark:border-neutral-800 p-2 bg-white dark:bg-neutral-950 animate-in scale-in duration-400 delay-300">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 24, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            formatter={(value: unknown) => {
              const v = typeof value === "number" ? value : Number(value);
              return [formatNumber(Number.isFinite(v) ? v : 0), "Downloads"] as const;
            }}
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "1px solid var(--tooltip-border)",
              borderRadius: "8px",
              color: "var(--tooltip-text)",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            labelStyle={{
              color: "var(--tooltip-label)",
              fontWeight: "500",
            }}
          />
          <Bar dataKey="downloads" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
