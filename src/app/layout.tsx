import localFont from "next/font/local";
import "./globals.css";
import "./components.css";
import MouseLight from "@/components/MouseLight";
import AOSWrapper from "@/components/Layout/AOSWrapper";

const nunitoSans = localFont({
  src: [
    {
      path: "../font/Nunito_Sans/nunito sans-latin.woff2",
      style: "normal",
    },
    {
      path: "../font/Nunito_Sans/nunito sans-italic-latin.woff2",
      style: "italic",
    },
  ],
});

export const metadata = {
  title: "Muhammad Aryo Muzakki",
  description: "Muhammad Aryo Muzakki Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark xsm:tw-text-[16px] tw-text-[14px]"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Aryo" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        // className={`${nunitoSans.className} tw-bg-gradient-to-br tw-from-primary-950 tw-from-50% tw-to-primary-900`}
        className={`${nunitoSans.className} tw-bg-gradient-primary`}
        // className={`tw-bg-gradient-primary`}
      >
        <MouseLight />
        <AOSWrapper />
        {children}
      </body>
    </html>
  );
}
