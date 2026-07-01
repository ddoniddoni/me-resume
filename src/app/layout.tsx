import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DDoni Resume | 박상돈 프론트엔드 개발자',
  description:
    '박상돈 프론트엔드 개발자의 경력, 프로젝트, 기술 스택, 연락처를 정리한 인터랙티브 이력서입니다.',
  openGraph: {
    description:
      'Next.js, React, Angular 기반 서비스 경험을 정리한 박상돈 프론트엔드 개발자 이력서입니다.',
    title: 'DDoni Resume',
    type: 'profile',
  },
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
