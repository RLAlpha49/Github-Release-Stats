import { Metadata } from "next";
import { Repo, Release } from "@/types/github";

export function generateRepositoryMetadata(
  owner: string,
  repo?: Repo,
  releases?: Release[]
): Metadata {
  const baseTitle = `${owner}'s GitHub Repositories`;
  const repoTitle = repo ? `${repo.name} - Release Statistics` : baseTitle;

  const baseDescription = `Explore ${owner}'s GitHub repositories and their release statistics.`;
  const repoDescription = repo
    ? `Analyze ${repo.name} repository releases: ${releases?.length || 0} releases, ${
        releases?.reduce(
          (sum, r) => sum + r.assets.reduce((a, asset) => a + asset.download_count, 0),
          0
        ) || 0
      } total downloads. Track download statistics and release patterns.`
    : baseDescription;

  return {
    title: repoTitle,
    description: repoDescription.slice(0, 160),
    openGraph: {
      title: repoTitle,
      description: repoDescription.slice(0, 160),
      url: repo ? `/${owner}/${repo.name}` : `/${owner}`,
    },
    twitter: {
      title: repoTitle,
      description: repoDescription.slice(0, 160),
    },
  };
}

export function generateStructuredData(owner: string, repo?: Repo, releases?: Release[]) {
  if (!repo) {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "GitHub Release Stats",
      description: "Analyze GitHub repository release statistics and download data",
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://github-release-stats.vercel.app",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browser",
    };
  }

  const totalDownloads =
    releases?.reduce(
      (sum, r) => sum + r.assets.reduce((a, asset) => a + asset.download_count, 0),
      0
    ) || 0;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: repo.name,
    description: `${repo.name} - GitHub repository with ${releases?.length || 0} releases`,
    url: `https://github.com/${repo.full_name}`,
    downloadUrl: `https://github.com/${repo.full_name}/releases`,
    author: {
      "@type": "Person",
      name: owner,
      url: `https://github.com/${owner}`,
    },
    codeRepository: `https://github.com/${repo.full_name}`,
    downloadCount: totalDownloads,
    releaseNotes: releases?.map(release => ({
      "@type": "TechArticle",
      name: release.name || release.tag_name,
      description: `Release ${release.tag_name} published ${release.published_at ? new Date(release.published_at).toLocaleDateString() : ""}`,
      datePublished: release.published_at,
      url: release.html_url,
    })),
  };
}
