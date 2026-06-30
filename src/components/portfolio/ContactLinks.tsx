import type { Profile } from '@/data/profile';

type ContactLinksProps = {
  profile: Profile;
};

export function ContactLinks({ profile }: ContactLinksProps) {
  const links = [
    {
      label: '이메일',
      value: profile.email,
      href: profile.email ? `mailto:${profile.email}` : '',
      todo: '입력 필요: 공개 이메일',
    },
    {
      label: 'GitHub',
      value: profile.github,
      href: profile.github,
      todo: '입력 필요: GitHub 주소',
    },
    {
      label: 'LinkedIn',
      value: profile.linkedin,
      href: profile.linkedin,
      todo: '입력 필요: LinkedIn 주소',
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
          {link.href ? (
            <a
              href={link.href}
              className="break-words text-sm font-semibold text-primary outline-none hover:text-primary-active focus-visible:rounded-full focus-visible:shadow-focus"
            >
              {link.value}
            </a>
          ) : (
            <span className="text-sm font-semibold text-body">{link.todo}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
