"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Repo, Release } from "@/types/github";
import { fetchUserRepos, fetchReleases } from "@/services/github-api";
import { formatNumber, formatDate, formatBytes } from "@/utils/formatters";
import { sumDownloads, avgDaysBetweenReleases } from "@/utils/release-stats";
import { trackReleaseDataView } from "@/utils/analytics";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { RepositorySelector } from "@/components/RepositorySelector";
import { StatCard } from "@/components/StatCard";
import { ReleaseChart } from "@/components/ReleaseChart";
import { Table } from "@/components/Table";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [relError, setRelError] = useState<string | null>(null);
  const [loadingReleases, setLoadingReleases] = useState(false);

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const owner = username.trim();

  const toggleExpanded = (id: number) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setRepos(null);
    setSelectedRepo("");
    setReleases(null);
    setRepoError(null);
    setRelError(null);
    if (!owner) return;
    try {
      setLoadingRepos(true);
      const data = await fetchUserRepos(owner);
      setRepos(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setRepoError(msg || "Failed to fetch repositories");
    } finally {
      setLoadingRepos(false);
    }
  }

  useEffect(() => {
    async function go() {
      if (!owner || !selectedRepo) return;
      setReleases(null);
      setRelError(null);
      try {
        setLoadingReleases(true);
        const data = await fetchReleases(owner, selectedRepo);
        setReleases(data);

        // Track release data view
        if (data && data.length > 0) {
          trackReleaseDataView(owner, selectedRepo, data.length);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setRelError(msg || "Failed to fetch releases");
      } finally {
        setLoadingReleases(false);
      }
    }
    go();
  }, [owner, selectedRepo]);

  const computed = useMemo(() => {
    if (!releases) return null;
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
  }, [releases]);

  return (
    <div className="min-h-[95.2vh] bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 dark:from-slate-950 dark:via-neutral-950 dark:to-violet-950 text-gray-900 dark:text-neutral-100 transition-colors duration-150 flex flex-col">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/10 transition-colors duration-150" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-400/10 transition-colors duration-150" />
        <div className="absolute inset-x-0 top-0 mx-auto h-[420px] w-[820px] rounded-full opacity-60 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-500/10 transition-colors duration-150" />
      </div>

      <div className="mx-auto max-w-5xl p-6 sm:p-10 flex-1">
        <Header />

        <SearchForm
          username={username}
          setUsername={setUsername}
          handleSearch={handleSearch}
          loadingRepos={loadingRepos}
        />

        {repoError && <ErrorMessage message={repoError} />}

        {repos && (
          <RepositorySelector
            repos={repos}
            selectedRepo={selectedRepo}
            setSelectedRepo={setSelectedRepo}
            owner={owner}
          />
        )}

        {loadingReleases && <LoadingIndicator />}

        {relError && <ErrorMessage message={relError} />}

        {releases && computed && (
          <section className="mt-8 space-y-6 animate-in fade-in scale-in duration-500 delay-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total releases" value={formatNumber(computed.totalReleases)} />
              <StatCard title="Total downloads" value={formatNumber(computed.totalDownloads)} />
              <StatCard
                title="Stable / Pre"
                value={`${formatNumber(computed.stableCount)} / ${formatNumber(computed.preCount)}`}
              />
              <StatCard
                title="Latest tag"
                value={computed.latest?.tag_name || "-"}
                subtitle={formatDate(computed.latest?.published_at)}
              />
              <StatCard
                title="Avg days between releases"
                value={computed.avgGap ? computed.avgGap.toFixed(1) : "-"}
              />
              <StatCard
                title="Top asset"
                value={computed.topAsset?.name || "-"}
                subtitle={
                  computed.topAsset
                    ? `${formatNumber(computed.topAsset.download_count)} downloads`
                    : undefined
                }
              />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[900ms]">
              <h2 className="text-lg font-medium mb-3 text-gray-900 dark:text-neutral-100">
                Releases
              </h2>

              {computed.releasesData && computed.releasesData.length > 0 && (
                <ReleaseChart data={computed.releasesData} owner={owner} repo={selectedRepo} />
              )}

              <Table
                releases={releases}
                expanded={expanded}
                toggleExpanded={toggleExpanded}
                formatDate={formatDate}
                formatNumber={formatNumber}
                formatBytes={formatBytes}
                owner={owner}
                repo={selectedRepo}
              />
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
