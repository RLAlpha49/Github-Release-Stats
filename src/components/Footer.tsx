import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800/70 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[1200ms]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-in slide-in-from-left duration-400 delay-[1300ms]">
          <div className="text-sm font-medium text-gray-900 dark:text-neutral-100">
            GitHub Release Stats
          </div>
          <div className="text-xs text-gray-600 dark:text-neutral-400">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm animate-in slide-in-from-right duration-400 delay-[1400ms]">
          <Link
            href="/about"
            className="hover:underline text-gray-900 dark:text-neutral-100 transition-all duration-200 hover:scale-110"
          >
            About
          </Link>
          <a
            className="hover:underline text-blue-600 dark:text-blue-400 transition-all duration-200 hover:scale-110"
            href="https://github.com/RLAlpha49/Github-Release-Stats"
            target="_blank"
            rel="noreferrer"
            aria-label="View source code on GitHub"
          >
            Repository
          </a>
          <span className="text-gray-600 dark:text-neutral-400">
            v{process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0"}
          </span>
          <a
            className="hover:underline text-gray-900 dark:text-neutral-100 transition-all duration-200 hover:scale-110"
            href="https://github.com/RLAlpha49"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit RLAlpha49's GitHub profile"
          >
            @RLAlpha49
          </a>
        </nav>
      </div>
    </footer>
  );
}
