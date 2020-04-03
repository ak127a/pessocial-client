export default {
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(118, 197, 246, 1)",
      main: "rgba(42, 143, 255, 1)",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(248, 219, 250, 1)",
      main: "rgba(255, 142, 221, 1)",
      dark: "rgba(230, 143, 255, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  spread: {
    invisibleSeparator: {
      border: "none",
      margin: "4px"
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      marginBottom: "20px"
    },
    tweetBody : {
      fontSize: "1rem",
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
      wordBreak:"break-all"
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        }
      },
      "& .logout-button": {
        position: "relative",
        minHeight: "50px",
        width: "50%",
        "& button ": {
          position: "absolute",
          top: "0%",
          right: "0%"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    paper: {
      padding: 20
    }
  }
};
