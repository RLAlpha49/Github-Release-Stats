import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | GitHub Release Stats",
  description:
    "The page you are looking for could not be found. Return to GitHub Release Stats to search for repository statistics.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-9xl font-bold text-gray-200 dark:text-neutral-800">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-neutral-400">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Return to Home
            </Link>

            <div className="text-sm text-gray-500 dark:text-neutral-500">
              <p>Looking for repository statistics?</p>
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Search GitHub repositories →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
