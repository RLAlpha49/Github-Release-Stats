import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About GitHub Release Stats",
  description:
    "Learn about GitHub Release Stats - a tool for analyzing repository release patterns, download statistics, and asset performance across GitHub repositories.",
  openGraph: {
    title: "About GitHub Release Stats",
    description:
      "Learn about GitHub Release Stats - a tool for analyzing repository release patterns, download statistics, and asset performance.",
    url: "/about",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About GitHub Release Stats
            </h1>
            <p className="text-xl text-gray-600 dark:text-neutral-400">
              A tool for analyzing GitHub repository release statistics and download data.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                What is GitHub Release Stats?
              </h2>
              <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">
                GitHub Release Stats is a powerful analytics tool that helps developers, project
                maintainers, and organizations understand the adoption and usage patterns of their
                GitHub releases. By providing insights into download statistics, release patterns,
                and asset performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-neutral-300">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    <strong>Release Analytics:</strong> Track download counts, release frequency,
                    and version adoption rates
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    <strong>Asset Performance:</strong> Analyze individual asset downloads and file
                    size distributions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    <strong>Visual Charts:</strong> Interactive charts showing download trends and
                    release timelines
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    <strong>Repository Comparison:</strong> Compare performance across multiple
                    repositories
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>
                    <strong>Export Data:</strong> Download statistics and insights for further
                    analysis
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                How to Use
              </h2>
              <ol className="space-y-3 text-gray-700 dark:text-neutral-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-medium rounded-full mr-3 flex-shrink-0">
                    1
                  </span>
                  <span>Enter a GitHub username or organization name in the search field</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-medium rounded-full mr-3 flex-shrink-0">
                    2
                  </span>
                  <span>Browse the list of available repositories with releases</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-medium rounded-full mr-3 flex-shrink-0">
                    3
                  </span>
                  <span>Select a repository to view detailed release statistics and charts</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-medium rounded-full mr-3 flex-shrink-0">
                    4
                  </span>
                  <span>Explore download trends, asset performance, and release patterns</span>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Privacy & Data
              </h2>
              <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">
                GitHub Release Stats uses the public GitHub API to fetch repository and release
                information. No private data is accessed, and all statistics are based on publicly
                available information. The application respects GitHub&apos;s rate limits and terms
                of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                Open Source
              </h2>
              <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">
                This project is open source and available on{" "}
                <a
                  href="https://github.com/RLAlpha49/Github-Release-Stats"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                . Contributions, bug reports, and feature requests are welcome!
              </p>
            </section>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-neutral-800">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to GitHub Release Stats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
