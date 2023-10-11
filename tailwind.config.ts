import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      transparent: '#fff0',
      current: 'currentColor',
      'c-black': '#000000',
      'c-white': '#ffffff',
      'c-red': '#dd0808',
      'c-green': '#00a814',
      'c-blue': '#180ae6',
      'c-pink': '#df8fe0',
      'c-grey': '#8A8A8A',
      'c-yellow': '#e8e337',
      'c-beige': '#F5F5DC',
      'c-violet': '#5f4b8b',
      'c-ruby': '#9b111e',
      'c-deepskyblue': '#00bfff',
      'c-bermudagreen': '#C5FAE8',
      'c-milk': '#FDF1BD',
      'c-brown': '#4c3228',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
