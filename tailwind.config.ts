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
        body: '#4d5562',
        muted: '#7c828a',
        'muted-soft': '#a8acb3',
        hairline: '#d7dce3',
        'hairline-soft': '#e9edf2',
        canvas: '#ffffff',
        panel: '#f6f8fb',
        strong: '#edf1f6',
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
        soft: '0 10px 30px rgb(10 11 13 / 0.08)',
      },
    },
  },
  plugins: [forms],
};

export default config;
