import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#1980E9",
  secondary: "#FECCC5",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#ffab91",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  /// ////////////
  // Solid Color
  /// ////////////
  white: "#fff",
  black: "#000",
  background: "#b2ebf2",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        size: "medium",
        sx: {
          marginTop: "5px",
          width: "160px",
          boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        display: "fixed",
        position: "relative",
        sx: {
          backgroundColor: "#ffffffbf",
          marginTop: "100px",
          width: "75%",
          borderRadius: "8px",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
        sx: {
          borderRadius: "8px",
          backgroundColor: "#ffffff80",
          marginTop: "1px",
          marginBottom: "1px",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(20px)",
        },
      },
    },
    MuiCardGrid: {
      defaultProps: {
        sx: {
          height: "100px",
          display: "flex",
        },
      },
    },
    MuiCardContent: {
      defaultProps: {
        sx: {
          height: "100px",
          display: "flex",
        },
      },
    },
    MuiCardMedia: {
      defaultProps: {
        sx: {
          paddingTop: "56.25%", // 16:9
        },
      },
    },

    MuiBox: {
      defaultProps: {
        sx: {
          marginTop: "100px",
          marginBottom: "100px",
        },
      },
      MuiTypography: {
        defaultProps: {
          color: Colors.primary,
          sx: { marginBottom: "4px" },
        },
      },
    },
  },
});

export default theme;
