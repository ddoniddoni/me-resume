export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePdfUrl: string;
};

export const profile: Profile = {
  name: 'DDoni',
  role: 'Frontend Developer',
  headline:
    'I build accessible, maintainable React interfaces with a product-minded frontend approach.',
  summary:
    'Frontend portfolio for showcasing React, Next.js, TypeScript, UI architecture, performance work, and production debugging experience.',
  // TODO: Replace with DDoni's preferred public location.
  location: 'TODO: Location',
  // TODO: Replace with DDoni's public contact email.
  email: '',
  // TODO: Replace with DDoni's public GitHub profile URL.
  github: '',
  // TODO: Replace with DDoni's public LinkedIn profile URL.
  linkedin: '',
  // TODO: Add the real resume PDF at public/resume/resume.pdf.
  resumePdfUrl: '/resume/resume.pdf',
};
