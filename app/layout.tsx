import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import { profile } from "@/lib/portfolio";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: profile.seoTitle,
  description: profile.seoDescription,
  keywords: [...profile.keywords],
  authors: [{ name: `${profile.firstName} ${profile.lastName}` }],
  openGraph: {
    type: "website",
    siteName: `${profile.firstName} ${profile.lastName}`,
    title: profile.seoTitle,
    description: profile.seoDescription,
    url: profile.site,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Co24669",
    creator: "@Co24669",
    title: profile.seoTitle,
    description: profile.seoDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${garamond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
