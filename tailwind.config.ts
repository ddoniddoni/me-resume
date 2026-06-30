import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0052ff',
        'primary-active': '#003ecc',
        ink: '#0a0b0d',
        body: '#5b616e',
        muted: '#7c828a',
        'muted-soft': '#a8acb3',
        hairline: '#dee1e6',
        'hairline-soft': '#eef0f3',
        canvas: '#ffffff',
        panel: '#f7f7f7',
        strong: '#eef0f3',
        'dark-elevated': '#16181c',
        circuit: '#0052ff',
        signal: '#f4b000',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Noto Sans KR',
          'Inter',
          'ui-sans-serif',
          'system-ui',
        ],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        focus: '0 0 0 3px rgb(0 82 255 / 0.28)',
        soft: '0 4px 12px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [forms],
};

export default config;
