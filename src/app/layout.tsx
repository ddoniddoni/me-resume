import type { Metadata } from 'next';
import './globals.css';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'DDoni의 프론트엔드 퀘스트',
  description: profile.summary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
