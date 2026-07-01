import { profile } from '@/data/profile';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-hairline-soft bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-12 text-sm text-body sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-ink">{SITE_NAME}</p>
        <p>
          {profile.role} {profile.name}의 포트폴리오입니다. 공개 이력서 저장소와
          연락처를 연결했습니다.
        </p>
      </div>
    </footer>
  );
}
