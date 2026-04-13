const r = {
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "var(--color-border)",
        muted: "var(--color-border-muted)",
        accent: "var(--color-border-accent)",
        input: "var(--color-input)",
        primary: "var(--color-primary)"
      },
      boxShadow: {
        "oee-time-segment": "0 4px 3px -1px rgba(0, 0, 0, 0.2), 0 0 3px 2px rgba(16, 134, 245, 0.3)",
        "card-hover": "0 2px 50px 1px rgba(0, 0, 0, 0.15)",
        "2xl": "var(--shadow-2xl)"
      },
      colors: {
        "load-state": {
          runtime: "var(--load-state-runtime)",
          idle: "var(--load-state-idle)",
          offline: "var(--load-state-offline)",
          planned: "var(--load-state-planned)",
          nodata: "var(--load-state-nodata)"
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
          7: "var(--chart-7)",
          8: "var(--chart-8)",
          "grid-line": "var(--chart-grid-line)",
          "axis-label": "var(--chart-axis-label)",
          "tooltip-bg": "var(--chart-tooltip-bg)",
          "tooltip-border": "var(--chart-tooltip-border)"
        },
        oee: {
          availability: "var(--oee-availability)",
          performance: "var(--oee-performance)",
          quality: "var(--oee-quality)",
          overall: "var(--oee-overall)"
        },
        "brand-grey": {
          100: "#F9FAFA",
          200: "#F0F3F5",
          300: "#E0E7EA",
          400: "#C2D0D6",
          500: "#A3B8C2",
          600: "#84A0AE",
          700: "#65889A",
          800: "#516D7B",
          900: "#3D525C",
          1e3: "#29373D",
          1100: "#141B1E",
          1200: "#051014"
        },
        "brand-primary": {
          50: "#F2F9FF",
          100: "#E6F7FF",
          200: "#BAE7FF",
          300: "#91D5FF",
          400: "#69C0FF",
          500: "#1987BE",
          600: "#1086F5",
          700: "#096DD9",
          800: "#0050B3",
          900: "#003A8C",
          1e3: "#002766",
          1100: "#00173D"
        },
        "brand-secondary": {
          100: "#EDE6FF",
          200: "#CCBAFF",
          300: "#AE91FF",
          400: "#9169FF",
          500: "#704DD1",
          600: "#5C34CB",
          700: "#4A2AA2",
          800: "#351986",
          900: "#200A5C",
          1e3: "#160052",
          1100: "#0E0033"
        },
        danger: {
          100: "#FFF1F0",
          200: "#FFCCC7",
          300: "#FFA39E",
          400: "#FF7875",
          500: "#FF4D4F",
          600: "#DB1A23",
          700: "#CF1322",
          800: "#A8071A",
          900: "#820014",
          1e3: "#5C0011",
          DEFAULT: "var(--color-danger)",
          foreground: "var(--color-danger-foreground)"
        },
        grey: {
          100: "#FAFAF9",
          200: "#F3F2F2",
          300: "#ECEBEA",
          400: "#DDDBDA",
          500: "#C9C7C5",
          600: "#B0ADAB",
          700: "#969492",
          800: "#706E6B",
          900: "#514F4D",
          1e3: "#3E3E3C",
          1100: "#2B2826",
          1200: "#080707"
        },
        success: {
          100: "#F6FFED",
          200: "#D9F7BE",
          300: "#B7EB8F",
          400: "#95DE64",
          500: "#73D13D",
          600: "#52C41A",
          700: "#389E0D",
          800: "#237804",
          900: "#135200",
          1e3: "#092B00",
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)"
        },
        warning: {
          100: "#FFFBE6",
          200: "#FFF1B8",
          300: "#FFE58F",
          400: "#FFD666",
          500: "#FFC53D",
          600: "#FAAD14",
          700: "#D48806",
          800: "#AD6800",
          900: "#874D00",
          1e3: "#613400",
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)"
        },
        background: {
          DEFAULT: "var(--color-background)",
          accent: "var(--color-background-accent)"
        },
        foreground: "var(--color-foreground)",
        muted: {
          foreground: "var(--color-muted-foreground)"
        },
        pale: {
          foreground: "var(--color-pale-foreground)"
        },
        subtle: {
          foreground: "var(--color-subtle-foreground)"
        },
        btn: {
          DEFAULT: "var(--color-btn-default)",
          foreground: "var(--color-btn-default-foreground)",
          accent: {
            DEFAULT: "var(--color-btn-default-accent)",
            foreground: "var(--color-btn-default-accent-foreground)"
          },
          pressed: "var(--color-btn-default-pressed)",
          primary: {
            DEFAULT: "var(--color-btn-primary)",
            foreground: "var(--color-btn-primary-foreground)",
            accent: {
              DEFAULT: "var(--color-btn-primary-accent)",
              foreground: "var(--color-btn-primary-accent-foreground)"
            }
          },
          secondary: {
            DEFAULT: "var(--color-btn-secondary)",
            foreground: "var(--color-btn-secondary-foreground)",
            accent: {
              DEFAULT: "var(--color-btn-secondary-accent)",
              foreground: "var(--color-btn-secondary-accent-foreground)"
            }
          },
          danger: {
            DEFAULT: "var(--color-btn-danger)",
            foreground: "var(--color-btn-danger-foreground)",
            accent: {
              DEFAULT: "var(--color-btn-danger-accent)",
              foreground: "var(--color-btn-danger-accent-foreground)"
            }
          }
        },
        border: {
          DEFAULT: "var(--color-border)",
          muted: "var(--color-border-muted)",
          accent: "var(--color-border-accent)",
          input: "var(--color-border-input)"
        },
        link: {
          DEFAULT: "var(--color-link)",
          hover: "var(--color-link-hover)",
          active: "var(--color-link-active)"
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-surface-foreground)",
          accent: {
            DEFAULT: "var(--color-surface-accent)",
            foreground: "var(--color-surface-accent-foreground)"
          }
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
          icon: "var(--color-card-icon)",
          danger: {
            DEFAULT: "var(--color-card-danger)",
            border: "var(--color-card-danger-border)"
          }
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)"
        },
        input: {
          DEFAULT: "var(--color-input)"
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      fontSize: {
        xs: ["11px", "13px"],
        sm: ["14px", "16px"],
        "2xl": ["24px", "28px"],
        "3xl": "32px"
      },
      screens: {
        xs: "640px",
        sm: "744px",
        md: "960px",
        lg: "1340px",
        xl: "1780px"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export {
  r as default
};
//# sourceMappingURL=tailwind.preset.js.map
