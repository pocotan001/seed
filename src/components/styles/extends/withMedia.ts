import { InterpolationValue } from "styled-components";
import media, { MediaKey, mediaKeys } from "~/components/styles/mixins/media";

export type MediaProps<P> = Partial<Record<MediaKey, P>>;
export type StyleFactory<P = {}> = (props: P) => InterpolationValue[];

/**
 * Pass different styles for different breakpoints as props for the component
 *
 * @example
 * interface StyleProps {
 *   color?: string;
 * }
 *
 * interface FooProps extends StyleProps, MediaProps<StyleProps> {
 *   ...
 * }
 *
 * const styles: StyleFactory<StyleProps> = ({ color }) => css`
 *   ${color && `color: ${color}`};
 * `;
 *
 * const Foo = styled<FooProps, "div">("div")`
 *   ${styles};
 *   ${withMedia(styles)};
 * `;
 *
 * <Foo
 *   color="tomato"
 *   phone={{ color: "mintcream" }}
 *   tablet={{ color: "peachpuff" }}
 * >
 *   Alo!
 * </Foo>
 */
const withMedia = (styles: StyleFactory) => (props: any) =>
  mediaKeys
    .filter(key => props[key])
    .map(key => media[key]`${styles(props[key])}`);

export default withMedia;
