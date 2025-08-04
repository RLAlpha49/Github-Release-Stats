interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div
      className={`group relative rounded-xl border border-gray-200 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/40 backdrop-blur p-4 transition-all duration-250 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 hover:scale-105 hover:-translate-y-1 hover:border-blue-300/50 dark:hover:border-blue-500/50 hover:bg-white dark:hover:bg-neutral-900/60 animate-in fade-in slide-in-from-bottom-1 duration-300 cursor-pointer`}
    >
      <div className="text-[11px] uppercase tracking-wide text-gray-600 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </div>
      <div className="text-xl font-semibold mt-1 text-gray-900 dark:text-neutral-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
        {value}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1 group-hover:text-gray-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
          {subtitle}
        </div>
      )}
      <div className="mt-3 h-1 w-full rounded bg-gradient-to-r from-blue-500/40 to-violet-500/40 group-hover:from-blue-500/60 group-hover:to-violet-500/60 transition-all duration-300" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-violet-500/0 group-hover:from-blue-500/5 group-hover:to-violet-500/5 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
