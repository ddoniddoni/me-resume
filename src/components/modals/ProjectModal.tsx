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
      title="Projects"
      description="Selected frontend project case studies."
      onClose={onClose}
    >
      <div className="grid gap-5">
        <p className="leading-7 text-slate-700">
          Structured project notes are kept in typed data files so the portfolio
          can grow without burying content inside UI components.
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
