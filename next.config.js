/** @type {import('next').NextConfig} */

const { join: pathJoin, dirname: pathDirname } = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const cMapsDir = pathJoin(pathDirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');
const standardFontsDir = pathJoin(
  pathDirname(require.resolve('pdfjs-dist/package.json')),
  'standard_fonts',
);

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: async () => {
    return [
      {
        source: "/cv-file",
        destination: "/data/cv_muhammad_aryo_muzakki.pdf",
      }
    ]
  },
  webpack: (config, options) => {
    // for react-pdf to work
    config.resolve.alias.canvas = false;

    config.plugins.push(new CopyWebpackPlugin({
      patterns: [
        {
          from: cMapsDir,
          to: "cmaps/",
        },
        {
          from: standardFontsDir,
          to: "standard_fonts/",
        },
      ]
    }))

    return config;
  }
}

module.exports = nextConfig
