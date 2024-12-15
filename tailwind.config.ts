import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#101010',
        gray: {
          light: '#e9e9e9',
          mid: '#9a9a9a',
          dark: '#5a5a5a',
        },
        opal: {
          transparent: '#3f937c0d',
          dim: '#d4e2dd4d',
          light: '#d4e2dd',
          mid: '#afc8bf',
          dark: '#3f937c',
        },
        accent: {
          gold: '#e9cc95',
          opal: '#3f937c',
        },
        primary: {
          default: '#1d4339',
          focused: '#285e50',
          selected: '#347866',
        },
      },
    },
  },
  plugins: [],
}
export default config
