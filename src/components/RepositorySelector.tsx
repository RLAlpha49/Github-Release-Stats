import { Repo } from "@/types/github";
import { trackRepositoryView } from "@/utils/analytics";

interface RepositorySelectorProps {
  repos: Repo[];
  selectedRepo: string;
  setSelectedRepo: (repo: string) => void;
  owner: string;
}

export function RepositorySelector({
  repos,
  selectedRepo,
  setSelectedRepo,
  owner,
}: RepositorySelectorProps) {
  const handleRepoChange = (repoName: string) => {
    if (repoName && owner) {
      trackRepositoryView(owner, repoName);
    }
    setSelectedRepo(repoName);
  };

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-bottom-1 duration-400 delay-100">
      <label className="block text-sm mb-2 text-gray-700 dark:text-neutral-300">
        Select repository
      </label>
      <select
        value={selectedRepo}
        onChange={e => handleRepoChange(e.target.value)}
        className="w-full sm:w-auto rounded-xl border border-gray-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/80 backdrop-blur px-3 py-2 text-gray-900 dark:text-neutral-100 transition-all duration-200 shadow-sm focus:shadow hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:scale-[1.02]"
      >
        <option value="" disabled>
          Select a repository
        </option>
        {repos.map(r => (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}
