// Google Analytics utility functions for tracking events

// Define gtag function type
type GtagFunction = (
  command: "config" | "event",
  targetId: string,
  config?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    gtag: GtagFunction;
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (typeof window.gtag !== "undefined" && gaId) {
    window.gtag("config", gaId, {
      page_location: url,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (typeof window.gtag !== "undefined" && gaId) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for common actions
export const trackSearch = (searchTerm: string, searchType: "user" | "org" = "user") => {
  trackEvent("search", "user_interaction", `${searchType}:${searchTerm}`);
};

export const trackRepositoryView = (owner: string, repo: string) => {
  trackEvent("view_repository", "repository_interaction", `${owner}/${repo}`);
};

export const trackReleaseDataView = (owner: string, repo: string, releaseCount: number) => {
  trackEvent("view_release_data", "repository_interaction", `${owner}/${repo}`, releaseCount);
};

export const trackChartView = (chartType: "release" | "asset", owner: string, repo: string) => {
  trackEvent("view_chart", "data_visualization", `${chartType}:${owner}/${repo}`);
};

export const trackThemeToggle = (theme: "light" | "dark") => {
  trackEvent("toggle_theme", "ui_interaction", theme);
};

export const trackTableExpand = (owner: string, repo: string, releaseTag: string) => {
  trackEvent("expand_release", "table_interaction", `${owner}/${repo}:${releaseTag}`);
};
