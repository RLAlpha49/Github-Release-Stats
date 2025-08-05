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
  title: "GitHub Release Stats",
  description: "Search repos and view GitHub release statistics",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
