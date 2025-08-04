import { Repo, Release } from "@/types/github";

function getHeaders() {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchUserRepos(usernameOrOrg: string): Promise<Repo[]> {
  const name = encodeURIComponent(usernameOrOrg);
  const headers = getHeaders();

  // Try organization repos first
  let res = await fetch(`https://api.github.com/orgs/${name}/repos?per_page=100`, {
    headers,
    next: { revalidate: 60 },
  });

  if (res.ok) {
    return res.json();
  }

  // If org not found (404), fall back to user repos
  if (res.status === 404) {
    res = await fetch(`https://api.github.com/users/${name}/repos?per_page=100`, {
      headers,
      next: { revalidate: 60 },
    });
    if (res.ok) return res.json();
  }

  // Build better error message
  const limit = res.headers.get("x-ratelimit-remaining");
  const reset = res.headers.get("x-ratelimit-reset");
  let hint = "";
  if (res.status === 403 && limit === "0" && reset) {
    const resetDate = new Date(Number(reset) * 1000);
    hint = ` Rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}.`;
  }
  throw new Error(`Failed to load repositories (${res.status}).${hint}`);
}

export async function fetchReleases(owner: string, repo: string): Promise<Release[]> {
  const res = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(
      owner
    )}/${encodeURIComponent(repo)}/releases?per_page=100`,
    {
      headers: getHeaders(),
      next: { revalidate: 30 },
    }
  );
  if (!res.ok) throw new Error(`Failed to load releases (${res.status})`);
  return res.json();
}
