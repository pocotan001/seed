import { keyframes, style } from "@vanilla-extract/css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 1 },
});

export const skeleton = style({
  cursor: "default",
  animation: `${pulse} 1.5s ease-in-out 0.5s infinite`,
  pointerEvents: "none",
});
