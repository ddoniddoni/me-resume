import type { Metadata } from 'next';
import './globals.css';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: "DDoni's Frontend Quest",
  description: profile.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
