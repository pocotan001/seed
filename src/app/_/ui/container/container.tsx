import { ComponentProps, ElementType, forwardRef, ReactElement } from "react";
import { Box } from "~/app/_/ui/box";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = ComponentProps<typeof Box<E>>;

export const Container: <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: Props<E>
) => ReactElement | null = forwardRef(function Container<
  E extends ElementType = typeof DEFAULT_ELEMENT
>(
  { as, maxW = 640, mx = "auto", w = "full", ...rest }: Props<E>,
  ref: typeof rest.ref
) {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return <Box ref={ref} as={Element} maxW={maxW} mx={mx} w={w} {...rest} />;
});
