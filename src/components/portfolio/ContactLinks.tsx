import type { Profile } from '@/data/profile';

type ContactLinksProps = {
  profile: Profile;
};

export function ContactLinks({ profile }: ContactLinksProps) {
  const links = [
    {
      label: '이메일',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: 'GitHub',
      value: profile.github,
      href: profile.github,
      opensInNewTab: true,
    },
    {
      label: 'Blog',
      value: profile.blog,
      href: profile.blog,
      opensInNewTab: true,
    },
  ];

  return (
    <ul className="grid gap-3">
      {links.map((link) => (
        <li
          key={link.label}
          className="flex flex-col gap-2 rounded-2xl border border-hairline bg-canvas p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-bold text-ink">{link.label}</span>
          <a
            href={link.href}
            target={link.opensInNewTab ? '_blank' : undefined}
            rel={link.opensInNewTab ? 'noreferrer' : undefined}
            className="break-words text-sm font-semibold text-primary outline-none hover:text-primary-active focus-visible:rounded-full focus-visible:shadow-focus"
          >
            {link.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
