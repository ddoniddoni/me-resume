export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript'],
  },
  {
    category: 'State Management',
    items: ['Zustand', 'React state patterns'],
  },
  {
    category: 'Styling',
    items: ['Tailwind CSS', 'Responsive UI', 'Accessible focus states'],
  },
  {
    category: 'Testing',
    items: ['TODO: Add testing tools used by DDoni'],
  },
  {
    category: 'Performance',
    items: ['Rendering optimization', 'Bundle awareness', 'Core Web Vitals'],
  },
  {
    category: 'Collaboration',
    items: ['Code review', 'Design handoff', 'Issue debugging'],
  },
  {
    category: 'Tools',
    items: ['npm', 'Git', 'Vercel'],
  },
];
