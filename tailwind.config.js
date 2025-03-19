/** @type {import('tailwindcss').Config} */


module.exports = {
  content:[
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "app-primary": "var(--app-primary)",
        black: "var(--black)",
        "colorspurple-100": "var(--colorspurple-100)",
        grey: "var(--grey)",
        "pet-adopt-colorblack-color-pet-dopt":
          "var(--pet-adopt-colorblack-color-pet-dopt)",
        "primitive-color-brand-black": "var(--primitive-color-brand-black)",
        "primitive-color-brand-white": "var(--primitive-color-brand-white)",
        "primitive-color-neutral-neutral-darker":
          "var(--primitive-color-neutral-neutral-darker)",
        "primitive-color-neutral-neutral-darkest":
          "var(--primitive-color-neutral-neutral-darkest)",
        "primitive-color-neutral-neutral-lighter":
          "var(--primitive-color-neutral-neutral-lighter)",
        "semantic-background-color-error":
          "var(--semantic-background-color-error)",
        "semantic-background-color-secondary":
          "var(--semantic-background-color-secondary)",
        "semantic-background-color-success":
          "var(--semantic-background-color-success)",
        "semantic-border-tertiary": "var(--semantic-border-tertiary)",
        "semantic-link-primary": "var(--semantic-link-primary)",
        "semantic-link-secondary": "var(--semantic-link-secondary)",
        "semantic-text-alternate": "var(--semantic-text-alternate)",
        "semantic-text-error": "var(--semantic-text-error)",
        "semantic-text-secondary": "var(--semantic-text-secondary)",
        "semantic-text-success": "var(--semantic-text-success)",
        white: "var(--white)",
        "white-color": "var(--white-color)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-body-paragraph-bold":
          "var(--body-body-paragraph-bold-font-family)",
        "body-paragraph-regular": "var(--body-paragraph-regular-font-family)",
        "body-small-bold": "var(--body-small-bold-font-family)",
        "heading-desktop-h1": "var(--heading-desktop-h1-font-family)",
        "heading-desktop-h2": "var(--heading-desktop-h2-font-family)",
        "heading-desktop-h3": "var(--heading-desktop-h3-font-family)",
        "heading-desktop-h4": "var(--heading-desktop-h4-font-family)",
        "heading-desktop-h5": "var(--heading-desktop-h5-font-family)",
        "heading-desktop-h6": "var(--heading-desktop-h6-font-family)",
        "heading-desktop-tagline": "var(--heading-desktop-tagline-font-family)",
        "heading-display-6-regular":
          "var(--heading-display-6-regular-font-family)",
        "heading-mobile-h1": "var(--heading-mobile-h1-font-family)",
        "heading-mobile-h2": "var(--heading-mobile-h2-font-family)",
        "heading-mobile-h3": "var(--heading-mobile-h3-font-family)",
        "heading-mobile-h4": "var(--heading-mobile-h4-font-family)",
        "heading-mobile-h5": "var(--heading-mobile-h5-font-family)",
        "heading-mobile-h6": "var(--heading-mobile-h6-font-family)",
        "text-large-bold": "var(--text-large-bold-font-family)",
        "text-large-extra-bold": "var(--text-large-extra-bold-font-family)",
        "text-large-light": "var(--text-large-light-font-family)",
        "text-large-link": "var(--text-large-link-font-family)",
        "text-large-medium": "var(--text-large-medium-font-family)",
        "text-large-normal": "var(--text-large-normal-font-family)",
        "text-large-semi-bold": "var(--text-large-semi-bold-font-family)",
        "text-medium-bold": "var(--text-medium-bold-font-family)",
        "text-medium-extra-bold": "var(--text-medium-extra-bold-font-family)",
        "text-medium-light": "var(--text-medium-light-font-family)",
        "text-medium-link": "var(--text-medium-link-font-family)",
        "text-medium-medium": "var(--text-medium-medium-font-family)",
        "text-medium-normal": "var(--text-medium-normal-font-family)",
        "text-medium-semi-bold": "var(--text-medium-semi-bold-font-family)",
        "text-regular-bold": "var(--text-regular-bold-font-family)",
        "text-regular-extra-bold": "var(--text-regular-extra-bold-font-family)",
        "text-regular-light": "var(--text-regular-light-font-family)",
        "text-regular-link": "var(--text-regular-link-font-family)",
        "text-regular-medium": "var(--text-regular-medium-font-family)",
        "text-regular-normal": "var(--text-regular-normal-font-family)",
        "text-regular-semi-bold": "var(--text-regular-semi-bold-font-family)",
        "text-small-bold": "var(--text-small-bold-font-family)",
        "text-small-extra-bold": "var(--text-small-extra-bold-font-family)",
        "text-small-light": "var(--text-small-light-font-family)",
        "text-small-link": "var(--text-small-link-font-family)",
        "text-small-medium": "var(--text-small-medium-font-family)",
        "text-small-normal": "var(--text-small-normal-font-family)",
        "text-small-semi-bold": "var(--text-small-semi-bold-font-family)",
        "text-tiny-bold": "var(--text-tiny-bold-font-family)",
        "text-tiny-extra-bold": "var(--text-tiny-extra-bold-font-family)",
        "text-tiny-light": "var(--text-tiny-light-font-family)",
        "text-tiny-link": "var(--text-tiny-link-font-family)",
        "text-tiny-medium": "var(--text-tiny-medium-font-family)",
        "text-tiny-normal": "var(--text-tiny-normal-font-family)",
        "text-tiny-semi-bold": "var(--text-tiny-semi-bold-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        large: "var(--large)",
        medium: "var(--medium)",
        small: "var(--small)",
        xlarge: "var(--xlarge)",
        xsmall: "var(--xsmall)",
        xxlarge: "var(--xxlarge)",
        xxsmall: "var(--xxsmall)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};



