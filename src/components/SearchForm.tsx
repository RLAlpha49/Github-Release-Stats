interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  handleSearch: (e?: React.FormEvent) => void;
  loadingRepos: boolean;
}

export function SearchForm({ username, setUsername, handleSearch, loadingRepos }: SearchFormProps) {
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-3 animate-in fade-in slide-in-from-top-2 duration-500 delay-400"
    >
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter GitHub username or org (e.g. vercel)"
        className="flex-1 rounded-xl border border-gray-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/80 backdrop-blur px-3 py-2 text-gray-900 dark:text-neutral-100 placeholder-gray-500 dark:placeholder-neutral-400 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm focus:shadow transition-all duration-200 focus:scale-[1.02]"
      />
      <button
        type="submit"
        disabled={!username.trim() || loadingRepos}
        className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 disabled:opacity-50 hover:from-blue-700 hover:to-violet-700 active:opacity-100 transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 shadow-lg hover:shadow-xl"
      >
        {loadingRepos ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Searching...
          </span>
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
}
