import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

const navItems = [
  { label: '이력서', href: '#resume' },
  { label: '프로젝트', href: '#projects' },
  { label: '기술', href: '#skills' },
  { label: '연락처', href: '#contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline-soft bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link
          href="#top"
          className="self-start text-sm font-semibold text-primary outline-none transition hover:text-primary-active focus-visible:rounded-full focus-visible:shadow-focus"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="주요 탐색">
          <ul className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-full px-3 py-2 text-sm font-medium text-body outline-none transition hover:bg-strong hover:text-ink focus-visible:shadow-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
