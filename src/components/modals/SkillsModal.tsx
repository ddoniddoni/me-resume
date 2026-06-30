'use client';

import { SkillInventory } from '@/components/portfolio/SkillInventory';
import { skills } from '@/data/skills';
import { BaseModal } from './BaseModal';

type SkillsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SkillsModal({ isOpen, onClose }: SkillsModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="기술"
      description="카테고리별 프론트엔드 기술 목록입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">
          프론트엔드 기술을 실제 작업 영역별로 묶었습니다. 정확한 도구 사용
          경험은 DDoni가 직접 확인해 TODO 항목을 교체하면 됩니다.
        </p>
        <SkillInventory skills={skills} />
      </div>
    </BaseModal>
  );
}
