"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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

interface GoogleAnalyticsProps {
  measurementId: string;
}

function GoogleAnalyticsInner({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;

    // Track page views on route changes
    const url = pathname + searchParams.toString();

    if (typeof window.gtag !== "undefined") {
      window.gtag("config", measurementId, {
        page_location: url,
      });
    }
  }, [pathname, searchParams, measurementId]);

  // Don't render anything on the client side
  return null;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner measurementId={measurementId} />
    </Suspense>
  );
}

// Server-side script injection component
export function GoogleAnalyticsScript({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_location: window.location.href,
              page_title: document.title,
            });
          `,
        }}
      />
    </>
  );
}
