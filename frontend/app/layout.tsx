import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://adib-portfolio.vercel.app"),
  title: "Adib Tajouri | Odoo Developer & Python Backend Engineer",
  description: "Expert Odoo developer and Python backend engineer. Specializing in enterprise ERP solutions, REST APIs, and system integrations for mid-market companies.",
  keywords: ["Odoo Developer", "Python Backend", "Django", "Flask", "ERP Integration", "Enterprise Solutions", "Freelancer"],
  authors: [{ name: "Adib Tajouri", url: "mailto:tadib24@gmail.com" }],
  creator: "Adib Tajouri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adib-portfolio.vercel.app",
    siteName: "Adib Tajouri",
    title: "Adib Tajouri | Odoo Developer & Python Backend Engineer",
    description: "Expert Odoo developer and Python backend engineer specializing in enterprise ERP solutions and system integrations.",
    images: [
      {
        url: "https://adib-portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adib Tajouri Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adib Tajouri | Odoo Developer & Python Backend Engineer",
    description: "Expert Odoo developer specializing in enterprise ERP solutions.",
    images: ["https://adib-portfolio.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://adib-portfolio.vercel.app" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
