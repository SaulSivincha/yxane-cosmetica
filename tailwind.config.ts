import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yxane: {
          ink: "#012622",
          hover: "#003B36",
          mist: "#ECE5F0",
          mauve: "#807182",
          celadon: "#80CFA9",
          paper: "#FAF9F8",
          surface: "#F4F3F2",
          line: "#C1C8C6",
          lead: "#C7C7C7"
        }
      },
      fontFamily: {
        serif: ["Noto Serif", "serif"],
        sans: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 18px 60px rgba(1, 38, 34, 0.08)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(8px)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "page-transition": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
            filter: "blur(2px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)"
          }
        }
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-out": "fade-out 0.3s ease-in both",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "fade-in-left": "fade-in-left 0.5s ease-out both",
        "fade-in-right": "fade-in-right 0.5s ease-out both",
        "fade-in-scale": "fade-in-scale 0.4s ease-out both",
        "page-transition": "page-transition 0.72s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
