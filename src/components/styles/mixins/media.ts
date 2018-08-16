import { css, Interpolation } from "styled-components";
import breakpoints, {
  IBreakpointKey
} from "~/components/styles/theme/breakpoints";
import { em } from "~/utils";

type IMediaFunction = <P>(
  strings: TemplateStringsArray,
  ...interpolations: Array<Interpolation<P>>
) => string;

export type IMediaKey = IBreakpointKey;
type IMedia = Record<IMediaKey, IMediaFunction>;

export const mediaKeys: IMediaKey[] = Object.keys(breakpoints) as any;

/**
 * A media query to target breakpoints
 *
 * @example
 * styled.div`
 *   ${media.phone<IProps>`
 *     background: tomato;
 *   `};
 * `
 */
const media: IMedia = mediaKeys.reduce(
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
