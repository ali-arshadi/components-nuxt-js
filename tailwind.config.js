/** @type {import('tailwindcss').Config} */
const withOpacity = (varName) => `hsl(var(${varName}) / <alpha-value>)`;
const PREFIX = 'ali-';


export default {
  content: [
    './components/**/*.vue,js,ts',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}'
  ],
  darkMode: 'class',
  prefix: `${PREFIX}`,
  safelist: [
    // Match *any* ali-bg-* class (with optional /opacity like ali-bg-primary/20)
    { pattern: /^ali-bg-[a-z0-9-]+(\/\d+)?$/ },

    // Match *any* ali-text-* class
    { pattern: /^ali-text-[a-z0-9-]+(\/\d+)?$/ },

    // Match *any* ali-border-* class
    { pattern: /^ali-border-[a-z0-9-]+(\/\d+)?$/ },

    // Match *any* ali-opacity-* class
    { pattern: /^ali-opacity-[0-9]+$/ },
  ],
  theme: {
    container: {center: true, padding: '1rem'},
    extend: {
      colors: {
        primary: withOpacity('--ali-primary'),
        'primary-dark': withOpacity('--ali-primary-dark'),
        accent: withOpacity('--ali-accent'),
        surface: withOpacity('--ali-surface'),
        'on-surface': withOpacity('--ali-on-surface'),
        muted: withOpacity('--ali-muted'),
        success: withOpacity('--ali-success'),
        warning: withOpacity('--ali-warning'),
        danger: withOpacity('--ali-danger')
      },
       opacity: {
        10: '0.10',
        20: '0.20',
        40: '0.40',
        60: '0.60',
        80: '0.80',
      },
      spacing: {
        xs: '4px',    // ali-p-xs, ali-mx-xs, etc.
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },

      borderRadius: {
        DEFAULT: '12px',
        md: '16px',
        xl: '24px',
        '2xl': '32px'
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
      },
      maxWidth: {
        content: '72ch',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        // ali-vazir: ['Vazir', 'sans-serif'],
      },
    },
  },
  plugins: [
    //* Typescale utilities
    function ({addComponents}) {
      const styles = {
        [`.${PREFIX}typescale-h1`]: {
          fontSize: 'var(--ali-fs-h1)',
          lineHeight: 'var(--ali-lh-h1)',
          fontWeight: 'var(--ali-fw-h1)',
        },
        [`.${PREFIX}typescale-h2`]: {
          fontSize: 'var(--ali-fs-h2)',
          lineHeight: 'var(--ali-lh-h2)',
          fontWeight: 'var(--ali-fw-h2)',
        },
        [`.${PREFIX}typescale-h3`]: {
          fontSize: 'var(--ali-fs-h3)',
          lineHeight: 'var(--ali-lh-h3)',
          fontWeight: 'var(--ali-fw-h3)',
        },
        [`.${PREFIX}typescale-h4`]: {
          fontSize: 'var(--ali-fs-h4)',
          lineHeight: 'var(--ali-lh-h4)',
          fontWeight: 'var(--ali-fw-h4)',
        },
        [`.${PREFIX}typescale-body`]: {
          fontSize: 'var(--ali-fs-body)',
          lineHeight: 'var(--ali-lh-body)',
          fontWeight: 'var(--ali-fw-body)',
        },
        [`.${PREFIX}typescale-small`]: {
          fontSize: 'var(--ali-fs-small)',
          lineHeight: 'var(--ali-lh-small)',
          fontWeight: 'var(--ali-fw-small)',
        },
      }
      addComponents(styles)
    }
  ],
}

