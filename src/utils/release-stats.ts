import { Release, ComputedStats } from "@/types/github";

export function sumDownloads(releases: Release[]) {
  return releases.reduce(
    (acc, r) => acc + r.assets.reduce((a, as) => a + (as.download_count || 0), 0),
    0
  );
}

export function avgDaysBetweenReleases(releases: Release[]) {
  const dates = releases
    .map(r => (r.published_at ? new Date(r.published_at).getTime() : undefined))
    .filter((t): t is number => typeof t === "number")
    .sort((a, b) => a - b);
  if (dates.length < 2) return undefined;
  const gapsConst: number[] = [];
  for (let i = 1; i < dates.length; i++)
    gapsConst.push((dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24));
  const avg = gapsConst.reduce((a, b) => a + b, 0) / gapsConst.length;
  return avg;
}

export function computeReleaseStats(releases: Release[]): ComputedStats {
  const totalReleases = releases.length;
  const totalDownloads = sumDownloads(releases);
  const latest = releases[0];
  const stableCount = releases.filter(r => !r.prerelease).length;
  const preCount = totalReleases - stableCount;
  const avgGap = avgDaysBetweenReleases(releases);
  const topAsset = releases
    .flatMap(r => r.assets)
    .sort((a, b) => (b.download_count || 0) - (a.download_count || 0))[0];
  const releasesData = releases
    .map(r => ({
      date: r.published_at ? new Date(r.published_at) : undefined,
      tag: r.tag_name,
      downloads: r.assets.reduce((a, as) => a + (as.download_count || 0), 0),
    }))
    .filter(d => d.date)
    .sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime())
    .map(d => ({
      dateLabel: new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "2-digit",
        year: "2-digit",
      }).format(d.date as Date),
      tag: d.tag,
      downloads: d.downloads,
    }));

  return {
    totalReleases,
    totalDownloads,
    latest,
    stableCount,
    preCount,
    avgGap,
    topAsset,
    releasesData,
  };
}
