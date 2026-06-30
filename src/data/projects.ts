export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period?: string;
  role: string;
  techStack: string[];
  summary: string;
  problem: string;
  solution: string[];
  impact: string[];
  learned: string[];
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'frontend-quest-portfolio',
    title: 'Frontend Quest Portfolio',
    subtitle: 'Interactive portfolio with recruiter-friendly direct access.',
    role: 'Frontend Developer',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    summary:
      'A portfolio experience that combines a fast professional landing page with an optional 2D exploration layer.',
    problem:
      'Traditional portfolios can feel interchangeable, while highly playful portfolios can hide the information recruiters need.',
    solution: [
      'Keep resume, projects, skills, and contact available through direct CTAs.',
      'Use structured content data so portfolio details are easy to update.',
      'Reserve game-like interaction as an optional enhancement.',
    ],
    impact: [
      'Creates a memorable first impression without blocking core portfolio access.',
      'Demonstrates frontend architecture, accessibility, and product judgment.',
    ],
    learned: [
      'Balance expressive UI ideas with recruiter usability and maintainable code.',
    ],
  },
];
