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
title: 'Matshidiso Lencoasa | Fiscal Justice & Human Rights',
  description: 'The official digital portal of Matshidiso Lencoasa. Advancing human rights through evidence-based budget advocacy and policy reform.',
  openGraph: {
    title: 'Matshidiso Lencoasa | Fiscal Justice Analyst',
    description: 'Transforming policy into social dignity.',
    // You can even add the path to her profile pic so it shows up in iMessage/WhatsApp previews!
    images: ['/images/profile/profile_matshidiso.png'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
