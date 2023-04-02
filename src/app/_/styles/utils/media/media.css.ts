import { StyleRule } from "@vanilla-extract/css";
import { media as mediaToken } from "~/app/_/styles/theme/tokens";

type Key = keyof typeof mediaToken;
type StyleRules = Partial<
  Record<Key, Omit<StyleRule, "@media" | "@container" | "@supports">>
>;

/**
 * Utility to make styles by media queries
 *
 * @example
 * style([
 *   base,
 *   media({
 *     tablet: { content: "tablet" },
 *     desktop: { content: "desktop" },
 *     light: { content: "light scheme" },
 *     dark: { content: "dark scheme" },
 *   }),
 * ])
 */
export const media = (rules: StyleRules): StyleRule => ({
  "@media": Object.fromEntries(
    Object.entries(rules).map(([key, rule]) => [mediaToken[key as Key], rule])
  ),
});
