export type Experience = {
  id: 'components' | 'performance' | 'troubleshooting';
  title: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: 'components',
    title: 'Component Architecture',
    summary:
      'Built reusable UI components to improve consistency, maintainability, and delivery speed.',
    highlights: [
      'Separated content, layout, and interaction responsibilities.',
      'Created component APIs that are easier to reuse and test.',
      'Kept design details consistent across responsive states.',
    ],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    summary:
      'Improved frontend responsiveness by focusing on rendering behavior, loading order, and asset weight.',
    highlights: [
      'Prioritized visible content before enhancement code.',
      'Reduced unnecessary client work where possible.',
      'Used qualitative impact language until real metrics are provided.',
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Debugging and Issue Handling',
    summary:
      'Investigated UI issues systematically and translated fixes into maintainable frontend changes.',
    highlights: [
      'Reproduced bugs before changing implementation details.',
      'Tracked root causes across state, layout, and browser behavior.',
      'Documented fixes clearly for future maintenance.',
    ],
  },
];
