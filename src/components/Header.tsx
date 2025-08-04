export function Header() {
  return (
    <header className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500 delay-100">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-in scale-in duration-700 delay-200">
          GitHub Release Stats
        </span>
      </h1>
      <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1 animate-in fade-in slide-in-from-top-1 duration-500 delay-300">
        Search a GitHub user or org, pick a repository, and view release statistics.
      </p>
    </header>
  );
}
