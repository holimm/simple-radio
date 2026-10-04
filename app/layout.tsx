import type { Metadata, Viewport } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Simple Radio 🎵🎵",
  description:
    "MySimpleRadio is a simple music player that streams from Youtube. Whether you are studying, playing games, or just relaxing.",
  icons: {
    icon: "/image/headphone.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={barlowCondensed.variable}>
      <body className={barlowCondensed.className}>{children}</body>
    </html>
  );
}
