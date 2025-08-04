interface MiniStatProps {
  label: string;
  value: string | number;
  sub?: string;
}

export function MiniStat({ label, value, sub }: MiniStatProps) {
  return (
    <div className="rounded-md border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 transition-all duration-200 hover:shadow-md hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600">
      <div className="text-[10px] uppercase tracking-wide text-gray-600 dark:text-neutral-400 break-words">
        {label}
      </div>
      <div className="text-base font-semibold mt-1 text-gray-900 dark:text-neutral-100 break-words">
        {value}
      </div>
      {sub && (
        <div className="text-[11px] text-gray-600 dark:text-neutral-400 mt-0.5 break-words">
          {sub}
        </div>
      )}
    </div>
  );
}
