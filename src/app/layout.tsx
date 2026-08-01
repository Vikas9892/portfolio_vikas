import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { siteConfig, socials } from "@/lib/site";
import { ThemeProvider } from "@/components/site/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software Engineer`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Vikas Tiwari",
    "software engineer",
    "distributed systems",
    "backend engineer",
    "applied AI",
    "IIIT Bhopal",
    "SDE intern",
    "C++",
    "Python",
    "RAG",
    "vector search",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhopal",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology, Bhopal",
  },
  knowsAbout: [
    "Distributed Systems",
    "Backend Engineering",
    "Retrieval-Augmented Generation",
    "Vector Search",
    "C++",
    "Python",
  ],
  sameAs: [
    socials.github,
    socials.linkedin,
    socials.leetcode,
    socials.codeforces,
    socials.codechef,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          // Static, author-controlled schema object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
