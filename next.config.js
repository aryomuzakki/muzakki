const { join: pathJoin, dirname: pathDirname } = require("path");
const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";

// copy manually pdf worker from node_modules (bug nextjs 14.1.0)
const pdfjsDistPath = pathDirname(require.resolve("pdfjs-dist/package.json"));
const pdfWorker = pathJoin(pdfjsDistPath, "build", "pdf.worker.min.js");

const publicDir = "./public/dist/js/";
fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(pdfWorker, pathJoin(publicDir, "pdf.worker.min.js"));

// copy cmaps and fonts to /public (since Turbopack has no CopyWebpackPlugin)
const cMapsDir = pathJoin(pdfjsDistPath, "cmaps");
const standardFontsDir = pathJoin(pdfjsDistPath, "standard_fonts");

fs.cpSync(cMapsDir, "./public/cmaps", { recursive: true });
fs.cpSync(standardFontsDir, "./public/standard_fonts", { recursive: true });

/** @type {import("next").NextConfig} */
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
  turbopack: {
    resolveAlias: {
      canvas: "false",
    },
  },
};

module.exports = nextConfig;
