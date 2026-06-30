import type { Profile } from '@/data/profile';

type ContactLinksProps = {
  profile: Profile;
};

export function ContactLinks({ profile }: ContactLinksProps) {
  const links = [
    {
      label: 'Email',
      value: profile.email,
      href: profile.email ? `mailto:${profile.email}` : '',
      todo: 'TODO: Add public email',
    },
    {
      label: 'GitHub',
      value: profile.github,
      href: profile.github,
      todo: 'TODO: Add GitHub URL',
    },
    {
      label: 'LinkedIn',
      value: profile.linkedin,
      href: profile.linkedin,
      todo: 'TODO: Add LinkedIn URL',
    },
  ];

  return (
    <ul className="grid gap-3">
      {links.map((link) => (
        <li
          key={link.label}
          className="flex flex-col gap-2 rounded-md border border-slate-200 bg-panel p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-bold text-ink">{link.label}</span>
          {link.href ? (
            <a
              href={link.href}
              className="text-sm font-bold text-circuit outline-none hover:text-ink focus-visible:rounded focus-visible:shadow-focus"
            >
              {link.value}
            </a>
          ) : (
            <span className="text-sm font-semibold text-slate-600">
              {link.todo}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
