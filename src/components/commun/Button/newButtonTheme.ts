// Button sizes
const size = {
  size: {
    small: {
      width: "90px",
      height: "28px",
      vertical: "7px",
      horizontal: "12px",
      fontSize: "12px",
    },
    medium: {
      width: "108px",
      height: "36px",
      vertical: "9.5px",
      horizontal: "16px",
      fontSize: "14px",
    },
    large: {
      width: "124px",
      height: "46px",
      vertical: "14.5px",
      horizontal: "24px",
      fontSize: "14px",
    },
  },
};

// Button states
const states = {
  // Primary
  primary: {
    hover: {
      background: "#575353",
      decoration: "none",
    },
    active: {
      background: "#131212",
      decoration: "none",
    },
    disabled: {
      background: "#D1D1D0",
      color: "#8F8F8F",
      borderColor: "transparent",
    },
  },
  // Secondary
  secondary: {
    hover: {
      background: "#E1E1DE",
      decoration: "none",
    },
    active: {
        background: "#E1E1DE",
        decoration: "none",
    },
    disabled: {
      background: "transaprent",
      color: "#B8B8B8",
      borderColor: "#D1D1D0",
    },
  },
  // Tertiary
  tertiary: {
    hover: {
      background: "transparent",
      decoration: "underline",
    },
    active: {
        background: "transparent",
      decoration: "underline",
    },
    disabled: {
      background: "transaprent",
      color: "#8F8F8F",
      borderColor: "transparent",
    },
  },
};


export const buttonTheme = {
  // Replace colors with theme
  colors: {
    // Primary
    primary: {
      background: "#131212",
      text: "#FFFFFF",
      borderColor: "transparent",
      borderWeight: "0",
      ...states.primary,
    },
    // Secondary
    secondary: {
      background: "transparent",
      text: "#575353",
      borderColor: "#8F8F8F",
      borderWeight: "1.5px",
      ...states.secondary,
    },
    // Tertiary
    tertiary: {
      background: "transparent",
      text: "#292727",
      borderWeight: "0",
      borderColor: "transparent",
      ...states.tertiary,
    },
  },
  ...size,
};
