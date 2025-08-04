import React from "react";
import { Release } from "@/types/github";
import { MiniStat } from "@/components/MiniStat";
import { AssetChart } from "@/components/AssetChart";

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
}

function Th({ children, className = "", ...rest }: ThProps) {
  return (
    <th
      className={`px-3 py-2 font-medium text-gray-900 dark:text-neutral-100 ${className}`}
      {...rest}
    >
      {children}
    </th>
  );
}

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
}

function Td({ children, className = "", ...rest }: TdProps) {
  return (
    <td className={`px-3 py-2 text-gray-800 dark:text-neutral-200 ${className}`} {...rest}>
      {children}
    </td>
  );
}

interface TableProps {
  releases: Release[];
  expanded: Record<number, boolean>;
  toggleExpanded: (id: number) => void;
  formatDate: (date?: string | null) => string;
  formatNumber: (num: number) => string;
  formatBytes: (bytes?: number) => string;
}

export function Table({
  releases,
  expanded,
  toggleExpanded,
  formatDate,
  formatNumber,
  formatBytes,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/40 backdrop-blur animate-in fade-in slide-in-from-bottom-1 duration-500 delay-[1100ms]">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-neutral-900">
          <tr className="text-left">
            <Th> </Th>
            <Th>Tag</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th className="text-right">Assets</Th>
            <Th className="text-right">Downloads</Th>
          </tr>
        </thead>
        <tbody>
          {releases.map(rel => {
            const total = rel.assets.reduce((a, as) => a + (as.download_count || 0), 0);
            const isOpen = !!expanded[rel.id];
            const largest = rel.assets.slice().sort((a, b) => (b.size || 0) - (a.size || 0))[0];
            const top = rel.assets
              .slice()
              .sort((a, b) => (b.download_count || 0) - (a.download_count || 0))[0];
            return (
              <React.Fragment key={rel.id}>
                <tr className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900/60 transition-colors">
                  <Td className="w-0">
                    <button
                      aria-label={isOpen ? "Collapse" : "Expand"}
                      onClick={() => toggleExpanded(rel.id)}
                      className="rounded border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-neutral-900 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <span
                        className={`inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </Td>
                  <Td>
                    <a
                      href={rel.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {rel.tag_name}
                    </a>
                  </Td>
                  <Td>{rel.name || "-"}</Td>
                  <Td>{formatDate(rel.published_at)}</Td>
                  <Td>
                    {rel.draft ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 px-3 py-0.5 text-xs font-medium ring-1 ring-amber-300/50 dark:from-amber-400/15 dark:to-yellow-400/10 dark:text-amber-200 dark:ring-amber-400/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3.5 w-3.5"
                        >
                          <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v1.302a6.5 6.5 0 0 0-5.198 5.197H2.75a.75.75 0 0 0 0 1.5h1.302a6.5 6.5 0 0 0 5.197 5.198v1.302a.75.75 0 0 0 1.5 0v-1.302a6.5 6.5 0 0 0 5.198-5.198h1.302a.75.75 0 0 0 0-1.5h-1.302a6.5 6.5 0 0 0-5.198-5.197V2.75Z" />
                        </svg>
                        Draft
                      </span>
                    ) : rel.prerelease ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-100 to-purple-100 text-purple-900 px-3 py-0.5 text-xs font-medium ring-1 ring-purple-300/50 dark:from-fuchsia-400/15 dark:to-purple-400/10 dark:text-purple-200 dark:ring-purple-400/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3.5 w-3.5"
                        >
                          <path d="M9.315 1.836a1 1 0 0 1 1.37 0l1.856 1.774 2.52.366a1 1 0 0 1 .554 1.706l-1.822 1.776.43 2.51a1 1 0 0 1-1.451 1.054L10 10.26l-2.272 1.19a1 1 0 0 1-1.451-1.054l.43-2.51L4.886 5.682a1 1 0 0 1 .553-1.706l2.52-.366L9.315 1.836Z" />
                        </svg>
                        Pre-release
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-900 px-3 py-0.5 text-xs font-medium ring-1 ring-emerald-300/50 dark:from-emerald-400/15 dark:to-green-400/10 dark:text-emerald-200 dark:ring-emerald-400/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-7.5 9.5a.75.75 0 0 1-1.094.07l-4-4a.75.75 0 1 1 1.06-1.06l3.39 3.389 6.98-8.846a.75.75 0 0 1 1.02-.105Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Stable
                      </span>
                    )}
                  </Td>
                  <Td className="text-right">{rel.assets.length}</Td>
                  <Td className="text-right">{formatNumber(total)}</Td>
                </tr>
                {isOpen && (
                  <tr className="bg-gray-100 dark:bg-neutral-900/60 animate-in fade-in slide-in-from-top-1 duration-400">
                    <Td colSpan={7} className="pt-0">
                      <div className="p-4 space-y-4 animate-in fade-in scale-in duration-300 delay-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="animate-in slide-in-from-left duration-300 delay-[100ms]">
                            <MiniStat label="Assets" value={rel.assets.length} />
                          </div>
                          <div className="animate-in slide-in-from-left duration-300 delay-[150ms]">
                            <MiniStat label="Total downloads" value={formatNumber(total)} />
                          </div>
                          <div className="animate-in slide-in-from-left duration-300 delay-[200ms]">
                            <MiniStat
                              label="Top asset"
                              value={top?.name || "-"}
                              sub={
                                top ? `${formatNumber(top.download_count)} downloads` : undefined
                              }
                            />
                          </div>
                          <div className="animate-in slide-in-from-left duration-300 delay-[250ms]">
                            <MiniStat
                              label="Largest asset"
                              value={largest?.name || "-"}
                              sub={largest ? `${formatBytes(largest.size)}` : undefined}
                            />
                          </div>
                        </div>

                        {rel.assets.length > 0 && <AssetChart assets={rel.assets} />}

                        <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-neutral-800 animate-in fade-in slide-in-from-bottom-1 duration-400 delay-500">
                          <table className="min-w-full text-xs sm:text-sm">
                            <thead className="bg-gray-50 dark:bg-neutral-950">
                              <tr className="text-left">
                                <Th>Asset</Th>
                                <Th className="text-right">Size</Th>
                                <Th className="text-right">Downloads</Th>
                                <Th className="text-right">Actions</Th>
                              </tr>
                            </thead>
                            <tbody>
                              {rel.assets.length === 0 ? (
                                <tr>
                                  <Td
                                    colSpan={4}
                                    className="text-center py-4 text-gray-500 dark:text-neutral-400"
                                  >
                                    No assets
                                  </Td>
                                </tr>
                              ) : (
                                rel.assets.map(as => (
                                  <tr
                                    key={as.id}
                                    className="border-t border-gray-200 dark:border-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors"
                                  >
                                    <Td className="font-medium">{as.name}</Td>
                                    <Td className="text-right">{formatBytes(as.size)}</Td>
                                    <Td className="text-right">
                                      {formatNumber(as.download_count || 0)}
                                    </Td>
                                    <Td className="text-right">
                                      <a
                                        href={as.browser_download_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center rounded bg-blue-600 text-white px-2 py-1 text-xs hover:opacity-90 active:opacity-100 transition"
                                      >
                                        Download
                                      </a>
                                    </Td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
