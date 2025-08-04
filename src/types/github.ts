export type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
};

export type ReleaseAsset = {
  id: number;
  name: string;
  download_count: number;
  size: number;
  browser_download_url: string;
};

export type Release = {
  id: number;
  tag_name: string;
  name: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  assets: ReleaseAsset[];
  html_url: string;
};

export type ChartDataPoint = {
  dateLabel: string;
  tag: string;
  downloads: number;
};

export type ComputedStats = {
  totalReleases: number;
  totalDownloads: number;
  latest: Release | undefined;
  stableCount: number;
  preCount: number;
  avgGap: number | undefined;
  topAsset: ReleaseAsset | undefined;
  releasesData: ChartDataPoint[];
};
