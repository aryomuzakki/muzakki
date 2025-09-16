/** @type {import("next").NextConfig} */

const { join: pathJoin, dirname: pathDirname } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";

// copy manually pdf worker from node_modules (bug nextjs 14.1.0)
const pdfjsDistPath = pathDirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorker = pathJoin(pdfjsDistPath, "build", "pdf.worker.min.js");

const publicDir = "./public/dist/js/";
fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(pdfWorker, pathJoin(publicDir, "pdf.worker.min.js"));

const cMapsDir = pathJoin(
  pathDirname(require.resolve("pdfjs-dist/package.json")),
  "cmaps",
);
const standardFontsDir = pathJoin(
  pathDirname(require.resolve("pdfjs-dist/package.json")),
  "standard_fonts",
);

const nextConfig = {
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: "/cv-file",
        destination: "/data/cv_muhammad_aryo_muzakki.pdf",
      },
    ];
  },
  eslint: { dirs: ["src"], ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  compiler: {
    ...(isDev
      ? {}
      : {
          removeConsole: {
            exclude: ["error"],
          },
        }),
  },
  webpack: (config, options) => {
    // for react-pdf to work
    config.resolve.alias.canvas = false;

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: cMapsDir,
            to: "cmaps/",
          },
          {
            from: standardFontsDir,
            to: "standard_fonts/",
          },
        ],
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
