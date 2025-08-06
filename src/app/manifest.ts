import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GitHub Release Stats",
    short_name: "GH Release Stats",
    description: "Analyze GitHub repository release statistics and download data",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "128x128",
        type: "image/x-icon",
      },
    ],
    categories: ["developer", "productivity", "utilities"],
    shortcuts: [
      {
        name: "Search Repositories",
        short_name: "Search",
        description: "Search for GitHub repositories and their release stats",
        url: "/",
        icons: [{ src: "/favicon.ico", sizes: "128x128" }],
      },
    ],
  };
}
