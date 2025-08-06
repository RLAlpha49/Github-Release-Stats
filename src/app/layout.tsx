import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import GoogleAnalytics, { GoogleAnalyticsScript } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GitHub Release Stats - Analyze Repository Downloads & Release Data",
    template: "%s | GitHub Release Stats",
  },
  description:
    "Analyze GitHub repository release statistics, download counts, and asset performance. Track release patterns and discover trending repositories with detailed analytics.",
  keywords: [
    "GitHub",
    "release statistics",
    "repository analytics",
    "download stats",
    "GitHub API",
    "open source",
    "software releases",
  ],
  authors: [{ name: "RLAlpha49" }],
  creator: "RLAlpha49",
  publisher: "GitHub Release Stats",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://github-release-stats.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "GitHub Release Stats - Analyze Repository Downloads & Release Data",
    description:
      "Analyze GitHub repository release statistics, download counts, and asset performance. Track release patterns and discover trending repositories with detailed analytics.",
    siteName: "GitHub Release Stats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        {gaId && <GoogleAnalyticsScript measurementId={gaId} />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-950 text-gray-900 dark:text-neutral-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {gaId && <GoogleAnalytics measurementId={gaId} />}
          <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-gray-200 dark:border-neutral-800">
            <div className="mx-auto max-w-5xl px-6 sm:px-10 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-neutral-400">
                GitHub Release Stats
              </div>
              <ThemeToggle />
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
