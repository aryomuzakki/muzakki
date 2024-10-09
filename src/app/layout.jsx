import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import "./components.css";
import MouseLight from "@/components/MouseLight";
import AOSWrapper from "@/components/Layout/AOSWrapper";

// const inter = Inter({ subsets: ["latin"] });

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Muhammad Aryo Muzakki",
  description: "Muhammad Aryo Muzakki Personal Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#555555" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
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
