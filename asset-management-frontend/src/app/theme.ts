import { createTheme } from "@mui/material/styles";

// Centralized theme for the entire dashboard UI.
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#7C3AED",
      light: "#A78BFA",
      dark: "#6D28D9",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#16A34A",
      light: "#22C55E",
      dark: "#15803D",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#DC2626",
      light: "#F04444",
      dark: "#B91C1C",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
      // Warning text color is usually darker for readability.
      contrastText: "#111827",
    },
    background: {
      default: "#F5F7FB", // page background
      paper: "#FFFFFF", // card/dialog surface
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12, // rounded corners (8–16px requirement)
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 1px rgba(16, 24, 40, 0.03)",
    "0px 2px 8px rgba(16, 24, 40, 0.06)",
    "0px 4px 14px rgba(16, 24, 40, 0.08)",
    "0px 6px 18px rgba(16, 24, 40, 0.09)",
    "0px 10px 24px rgba(16, 24, 40, 0.10)",
    "0px 14px 34px rgba(16, 24, 40, 0.12)",
    "0px 18px 46px rgba(16, 24, 40, 0.14)",
    "0px 22px 58px rgba(16, 24, 40, 0.16)",
    "0px 26px 70px rgba(16, 24, 40, 0.18)",
    "0px 30px 86px rgba(16, 24, 40, 0.20)",
    "0px 34px 102px rgba(16, 24, 40, 0.22)",
    "0px 38px 118px rgba(16, 24, 40, 0.24)",
    "0px 42px 134px rgba(16, 24, 40, 0.26)",
    "0px 46px 150px rgba(16, 24, 40, 0.28)",
    "0px 50px 166px rgba(16, 24, 40, 0.30)",
    "0px 54px 182px rgba(16, 24, 40, 0.32)",
    "0px 58px 198px rgba(16, 24, 40, 0.34)",
    "0px 62px 214px rgba(16, 24, 40, 0.36)",
    "0px 66px 230px rgba(16, 24, 40, 0.38)",
    "0px 70px 246px rgba(16, 24, 40, 0.40)",
    "0px 74px 262px rgba(16, 24, 40, 0.42)",
    "0px 78px 278px rgba(16, 24, 40, 0.44)",
    "0px 82px 294px rgba(16, 24, 40, 0.46)",
    "0px 86px 310px rgba(16, 24, 40, 0.48)",
  ],
  typography: {
    fontFamily: "\"Roboto\", sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2.125rem",
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "-0.01em",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
        }),
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          // theme.shape.borderRadius is typed as number|string in some setups.
          borderRadius:
            typeof theme.shape.borderRadius === "number"
              ? (theme.shape.borderRadius as number) / 2
              : 6,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
  },
});
