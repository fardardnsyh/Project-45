import type { Config } from 'tailwindcss';
const {nextui} = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'bright-turquoise': {
          '50': '#f1fcfb',
          '100': '#cef9f5',
          '200': '#9ef1eb',
          '300': '#6ae4df',
          '400': '#35cccb',
          '500': '#1cafb0',
          '600': '#14898d',
          '700': '#146d71',
          '800': '#15565a',
          '900': '#16494b',
          '950': '#06292d',
      },
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
export default config
