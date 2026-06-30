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
    <BaseModal isOpen={isOpen} title="Skills" onClose={onClose}>
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">
          Frontend skills are grouped by practical working area, with TODO
          placeholders where DDoni should provide exact tooling details.
        </p>
        <SkillInventory skills={skills} />
      </div>
    </BaseModal>
  );
}
