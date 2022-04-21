import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const Colors = {
  primary: "#1980E9",
  primary_light: "#1980e940",
  secondary: "#FECCC5",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#00000080",
  light: "#ffffff80",
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

export const lightPalette = {
  primary: {
    main: Colors.primary,
    light: Colors.primary_light,
  },
  secondary: {
    main: Colors.secondary,
  },
  bg: {
    main: Colors.white,
    light: Colors.light,
  },
  colors: Colors,
  txt: Colors.black,
};

export const darkPalette = {
  primary: {
    main: Colors.primary,
    light: Colors.primary_light,
  },
  secondary: {
    main: Colors.black,
  },
  bg: {
    main: Colors.black,
    light: Colors.dark,
  },
  colors: Colors,
  txt: Colors.white,
};
export const components = {
  MuiButton: {
    defaultProps: {
      variant: "contained",

      size: "medium",
      sx: {
        backgroundColor: "primary.light",
        color: "txt",
        marginTop: "5px",
        width: "160px",
        boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      },
    },
  },
  MuiContainer: {
    defaultProps: {
      sx: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90%",
        backgroundColor: "Colors.light",
        width: "100%",
        borderRadius: "8px",
      },
    },
  },
  MuiToolbar: {
    defaultProps: {
      sx: {
        backgroundColor: "primary.light",
        color: "txt",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      sx: {
        backgroundColor: "primary.light",
        input: { color: "txt" },
        label: { color: "txt" },
      },
    },
  },
  MuiCard: {
    defaultProps: {
      variant: "outlined",
      sx: {
        minWidth: "470px",
        borderRadius: "8px",
        backgroundColor: "primary.light",
        marginTop: "1px",
        marginBottom: "1px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 12px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
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
        width: "100%",
        marginTop: "100px",
        marginBottom: "100px",
      },
    },
    MuiTypography: {
      defaultProps: {
        sx: {
          color: "txt",
        },
      },
    },
  },
};

let atheme = createTheme({
  palette: darkPalette,

  components,
  root: {
    width: "100%",
    height: "100vh",
    marginTop: 0,
    zIndex: 1,
    overflow: "hidden",
    backgroundColor: "bg.main",
  },
});
const theme = responsiveFontSizes(atheme);

export default theme;
