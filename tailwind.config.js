/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // GitTogether Brand Colors
      colors: {
        // Primary Orange Gradient
        "primary-orange": "#ff734d",
        "deep-orange": "#d64000",
        "warm-brown": "#c26328",
        "lighter-brown": "#d78451",
        "dark-brown": "#804718",

        // Semantic color mappings (will use CSS variables)
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
      },

      // Border Radius
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-xl)",
      },

      // Background Images (Gradients)
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero-bg)",
        "gradient-features": "var(--gradient-features-bg)",
        "gradient-cta": "var(--gradient-cta)",
        "gradient-hero-text": "var(--gradient-hero-text)",
        "gradient-features-heading": "var(--gradient-features-heading)",
      },

      // Box Shadows with Orange Tint
      boxShadow: {
        orange:
          "0 4px 6px -1px rgba(255, 115, 77, 0.1), 0 2px 4px -1px rgba(255, 115, 77, 0.06)",
        "orange-lg":
          "0 10px 15px -3px rgba(255, 115, 77, 0.1), 0 4px 6px -2px rgba(255, 115, 77, 0.05)",
        "orange-xl":
          "0 20px 25px -5px rgba(255, 115, 77, 0.1), 0 10px 10px -5px rgba(255, 115, 77, 0.04)",
      },

      // Animation Keyframes
      keyframes: {
        "subtle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "word-slide": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "15%": { transform: "translateY(0)", opacity: "1" },
          "85%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-20px)", opacity: "0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "button-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 115, 77, 0.7)" },
          "50%": { boxShadow: "0 0 0 8px rgba(255, 115, 77, 0)" },
        },
      },

      // Animation Utilities
      animation: {
        "subtle-float": "subtle-float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "word-slide": "word-slide 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "button-pulse": "button-pulse 1.5s infinite",
      },

      // Font Families
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },

  // Dark mode configuration
  darkMode: "class", // Use class-based dark mode (.dark)

  plugins: [],
};
