import { ChartDataPoint } from "@/types/github";
import { formatNumber } from "@/utils/formatters";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "@/components/Charts";

interface ReleaseChartProps {
  data: ChartDataPoint[];
}

export function ReleaseChart({ data }: ReleaseChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-4 h-48 w-full rounded-xl border border-gray-200 dark:border-neutral-800/80 p-2 bg-white dark:bg-neutral-900/80 backdrop-blur animate-in scale-in duration-400 delay-[1000ms]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-neutral-800"
          />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
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
          <Line type="monotone" dataKey="downloads" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
