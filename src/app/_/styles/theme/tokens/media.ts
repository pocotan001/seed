export const media = {
  tablet: "screen and (min-width: 768px)",
  desktop: "screen and (min-width: 1024px)",
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
} satisfies Record<string, string>;
