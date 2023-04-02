import { globalStyle } from "@vanilla-extract/css";
import { vars } from "~/app/_/styles/theme/theme.css";

globalStyle("body", {
  backgroundColor: vars.colors.white,
  color: vars.colors["gray.800"],
  fontFamily: vars.fonts.sans,
  lineHeight: 1.5,
});

globalStyle("a, button", {
  cursor: "pointer",
});

globalStyle("b, strong", {
  fontWeight: "bolder",
});

globalStyle("code, kbd, samp, pre", {
  fontFamily: vars.fonts.mono,
  fontSize: "1em",
});

globalStyle("small", {
  fontSize: "80%",
});

globalStyle("sub, sup", {
  fontSize: "75%",
  lineHeight: 0,
  position: "relative",
  verticalAlign: "baseline",
});

globalStyle("sub", {
  bottom: "-0.25em",
});

globalStyle("sup", {
  top: "-0.5em",
});

globalStyle(":disabled", {
  cursor: "default",
});

globalStyle(":focus-visible", {
  outline: "revert",
});
