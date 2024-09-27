import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/assets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/BlurMed.png')",
      },

      // Define keyframes for animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInWithTyping: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      // Define animations
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards', // Fade-in animation with a 0.5s duration
        fadeInWithTyping: 'fadeInWithTyping 0.7s ease-out forwards', // Fade-in with slight movement
      },

      screens: {
        xsm: '400px',
        sm: '500px',
        md: '650px',
        mlg: '850px',
        lg: '1000px',
        xl: '1280px',
      },

      height: {
        128: '32rem', // 512px
        144: '36rem', // 576px
        'custom-height': '460px', // Custom height example
        '90vh': '90vh', // 90% of the viewport height
      },

      zIndex: {
        '-10': -10,
        '-5': -5,
        '-1': -1,
      },

      colors: {
        metallicGray: {
          light: '#d1d5db',
          DEFAULT: '#6b7280',
          dark: '#4b5563',
        },
        primary: {
          light: '#83a79d',
          DEFAULT: '#E14411',
          dark: '#8B322C',
        },
        secondary: {
          light: '#FEFAE0',
          DEFAULT: '#FFD700',
          dark: '#2D4059',
        },
        color: {
          1: '#AC6AFF',
          2: '#FFC876',
          3: '#FF776F',
          4: '#7ADB78',
          5: '#858DFF',
          6: '#FF98E2',
        },
        stroke: {
          1: '#26242C',
        },
        n: {
          1: '#FFFFFF',
          2: '#CAC6DD',
          3: '#ADA8C3',
          4: '#757185',
          5: '#3F3A52',
          6: '#252134',
          7: '#15131D',
          8: '#0E0C15',
          9: '#474060',
          10: '#43435C',
          11: '#1B1B2E',
          12: '#2E2A41',
          13: '#6C7275',
        },
      },

      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        code: 'var(--font-code)',
        grotesk: 'var(--font-grotesk)',
        matemasie: ['Matemasie', 'sans-serif'],
        libre: ['Libre Baskerville', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        caveat: ['Caveat', 'cursive'], // Add the Caveat font
        chewy: ['Chewy', 'cursive'],
        permanent: ['Permanent Marker', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        suse: ['SUSE', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        varela: ['Varela Round', 'sans-serif'],
        source: ['Source Code Pro', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],

      },

      letterSpacing: {
        tagline: '.15em',
      },

      spacing: {
        0.25: '0.0625rem',
        7.5: '1.875rem',
        15: '3.75rem',
      },

      opacity: {
        15: '.15',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'linear',
      },

      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },

      borderWidth: {
        DEFAULT: '0.0625rem',
      },

      backgroundImage: {
        parallax:
          "url('https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2157&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient':
          'conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)',
        'benefit-card-1': 'url(assets/benefits/card-1.svg)',
        'benefit-card-2': 'url(assets/benefits/card-2.svg)',
        'benefit-card-3': 'url(assets/benefits/card-3.svg)',
        'benefit-card-4': 'url(assets/benefits/card-4.svg)',
        'benefit-card-5': 'url(assets/benefits/card-5.svg)',
        'benefit-card-6': 'url(assets/benefits/card-6.svg)',
      },
    },
  },

  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({})
      addComponents({
        '.container': {
          '@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]':
            {},
        },
        '.h1': {
          '@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]':
            {},
        },
        '.h2': {
          '@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight':
            {},
        },
        '.h3': {
          '@apply text-[2rem] leading-normal md:text-[2.5rem]': {},
        },
        '.h4': {
          '@apply text-[2rem] leading-normal': {},
        },
        '.h5': {
          '@apply text-2xl leading-normal': {},
        },
        '.h6': {
          '@apply font-semibold text-lg leading-8': {},
        },
        '.body-1': {
          '@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8':
            {},
        },
        '.body-2': {
          '@apply font-light text-[0.875rem] leading-6 md:text-base': {},
        },
        '.caption': {
          '@apply text-sm': {},
        },
        '.tagline': {
          '@apply font-grotesk font-light text-xs tracking-tagline uppercase':
            {},
        },
        '.quote': {
          '@apply font-code text-lg leading-normal': {},
        },
        '.button': {
          '@apply font-code text-xs font-bold uppercase tracking-wider': {},
        },
      })
      addUtilities({
        '.tap-highlight-color': {
          '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        },
      })
    }),
  ],
}
