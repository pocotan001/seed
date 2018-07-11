import { Interpolation, ThemedStyledProps } from "styled-components";
import theme, { ITheme } from "~/components/styles/theme";
import { css } from "~/components/styles/themedStyledComponents";
import { em } from "~/infrastructure/utils";

type IMediaKey = keyof ITheme["breakpoints"];
type IMediaFunction = <P>(
  strings: TemplateStringsArray,
  ...interpolations: Array<Interpolation<ThemedStyledProps<P, ITheme>>>
) => string;
type IMedia = Record<IMediaKey, IMediaFunction>;

/**
 * A media query to target `theme.breakpoints`
 *
 * @example
 * styled.div`
 *   ${media.phone<IProps>`
 *     background: tomato;
 *   `};
 * `
 */
const media: IMedia = (Object.keys(theme.breakpoints) as IMediaKey[]).reduce(
  (acc, name) => ({
    ...acc,
    // Use em in breakpoints to work properly cross-browser and support users
    // https://zellwk.com/blog/media-query-units/
    [name]: (strings: any, ...interpolations: any[]) => css`
      @media (max-width: ${em(theme.breakpoints[name])}) {
        ${css(strings, ...interpolations)};
      }
    `
  }),
  Object.create(null)
);

export default media;
