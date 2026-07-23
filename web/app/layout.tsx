import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cantata 3B — Technical Validation Preview",
  description:
    "Technical preview of Cantata's 3B-parameter multi-stream generative music model. Lyric-conditioned vocals and stable multi-stream training.",
  openGraph: {
    title: "Cantata 3B — Technical Validation Preview",
    description:
      "Technical preview of Cantata's 3B-parameter multi-stream generative music model. Lyric-conditioned vocals and stable multi-stream training.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cantata segment-wise multi-stem architecture diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantata 3B — Technical Validation Preview",
    description:
      "Technical preview of Cantata's 3B-parameter multi-stream generative music model. Lyric-conditioned vocals and stable multi-stream training.",
    images: [
      {
        url: "/og-image.png",
        alt: "Cantata segment-wise multi-stem architecture diagram",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
