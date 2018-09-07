import { css, Interpolation, InterpolationValue } from "styled-components";
import { em } from "~/utils";

export type MediaKey = "tablet" | "phone";

type MediaCssFunction = <P>(
  strings: TemplateStringsArray,
  ...interpolations: Array<Interpolation<P>>
) => InterpolationValue[];

const breakpoints: Record<MediaKey, number> = {
  tablet: 768,
  phone: 376
};

export const mediaKeys: MediaKey[] = Object.keys(breakpoints) as any;

/**
 * A media query to target breakpoints
 *
 * @example
 * styled.div`
 *   ${media.phone<Props>`
 *     background: tomato;
 *   `};
 * `
 */
const media: Record<MediaKey, MediaCssFunction> = mediaKeys.reduce(
  (acc, name) => ({
    ...acc,
    // Use em in breakpoints to work properly cross-browser and support users
    // https://zellwk.com/blog/media-query-units/
    [name]: (strings: any, ...interpolations: any[]) => css`
      @media (max-width: ${em(breakpoints[name])}) {
        ${css(strings, ...interpolations)};
      }
    `
  }),
  Object.create(null)
);

export default media;
