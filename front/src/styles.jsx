import { createTheme } from "@mui/material/styles";

const Colors = {
  primary: "#00adb5",
  secondary: "#95defb",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
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
        sx: {
          marginTop: "5px",
          color: Colors.black,
          backgroundColor: Colors.primary,
          marginLeft: "5px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        sx: {
          marginTop: "100px",
          width: "50%",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        sx: {
          marginTop: "1px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiCardGrid: {
      defaultProps: {
        sx: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
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
    },
  },
});

export default theme;
