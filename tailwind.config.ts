import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213d',
        circuit: '#1b998b',
        signal: '#f4b942',
        panel: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgb(27 153 139 / 0.35)',
      },
    },
  },
  plugins: [forms],
};

export default config;
