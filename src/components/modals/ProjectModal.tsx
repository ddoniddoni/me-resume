'use client';

import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { projects } from '@/data/projects';
import { BaseModal } from './BaseModal';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      title="프로젝트"
      description="주요 프론트엔드 프로젝트 사례입니다."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-body">
          프로젝트 내용은 타입이 지정된 데이터 파일에 보관해, UI 컴포넌트 안에
          콘텐츠를 숨기지 않고 쉽게 확장할 수 있도록 했습니다.
        </p>
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
