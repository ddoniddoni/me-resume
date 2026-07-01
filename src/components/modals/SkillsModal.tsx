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
        <p className="leading-7 text-body">
          공개 이력서에 정리된 프레임워크, 상태 관리, 스타일링, 성능 개선, 운영
          UI 경험을 작업 영역별로 묶었습니다.
        </p>
        <SkillInventory skills={skills} />
      </div>
    </BaseModal>
  );
}
