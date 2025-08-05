"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { trackThemeToggle } from "@/utils/analytics";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add theme-loaded class to enable transitions
    document.documentElement.classList.add("theme-loaded");
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-lg border border-transparent px-3 py-2 text-sm opacity-0"
        aria-hidden
      >
        <span className="w-4 h-4 block">…</span>
      </button>
    );
  }

  const current = resolvedTheme || theme || "system";
  const isDark = current === "dark";

  const handleThemeToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    trackThemeToggle(newTheme);
  };

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={handleThemeToggle}
      className="relative rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-2 text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx={12} cy={12} r={5} />
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon icon */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}
