export type IColorKey = keyof typeof colors;

const colors = Object.freeze({
  white: "#fff",
  black: "#000",
  // Grey
  grey50: "#fafafa",
  grey100: "#f5f5f5",
  grey200: "#eeeeee",
  grey300: "#e0e0e0",
  grey400: "#bdbdbd",
  grey500: "#9e9e9e",
  grey600: "#757575",
  grey700: "#616161",
  grey800: "#424242",
  grey900: "#212121",
  // Pink
  pink50: "#fce4ec",
  pink100: "#f8bbd0",
  pink200: "#f48fb1",
  pink300: "#f06292",
  pink400: "#ec407a",
  pink500: "#e91e63",
  pink600: "#d81b60",
  pink700: "#c2185b",
  pink800: "#ad1457",
  pink900: "#880e4f"
});

export default colors;
