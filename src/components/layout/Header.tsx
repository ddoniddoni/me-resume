import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

const navItems = [
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link
          href="#top"
          className="text-sm font-black uppercase tracking-[0.16em] text-ink outline-none transition hover:text-circuit focus-visible:rounded focus-visible:shadow-focus"
        >
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="hidden items-center gap-2 sm:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition hover:bg-white hover:text-ink focus-visible:shadow-focus"
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
