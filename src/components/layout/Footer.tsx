import { profile } from '@/data/profile';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-slate-800">{SITE_NAME}</p>
        <p>
          {profile.role} portfolio. TODO: Add final contact links and resume
          details.
        </p>
      </div>
    </footer>
  );
}
