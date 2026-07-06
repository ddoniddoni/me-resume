import { careerStatementItems } from './careerStatement';

export type PortfolioProject = {
  id: string;
  title: string;
  company: string;
  period: string;
  problem: string;
  role: string;
  techStack: string[];
  implementations: string[];
  results: string[];
  learning: string;
};

export const portfolioProjects: PortfolioProject[] =
  careerStatementItems.flatMap((career) =>
    career.projects.map((project, index) => ({
      id: `${career.company}-${index}`,
      title: project.title,
      company: career.company,
      period: career.period,
      problem: project.content,
      role: project.role,
      techStack: career.techStack,
      implementations: project.implementations,
      results: project.results,
      learning: 'TODO: 실제 프로젝트별 배운 점을 추가해주세요.',
    })),
  );
