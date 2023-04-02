import { ComponentProps, ElementType, forwardRef, ReactElement } from "react";
import { Box } from "~/app/_/ui/box";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = ComponentProps<typeof Box<E>>;

export const Stack: <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: Props<E>
) => ReactElement | null = forwardRef(function Stack<
  E extends ElementType = typeof DEFAULT_ELEMENT
>(
  { as, display = "flex", direction = "column", ...rest }: Props<E>,
  ref: typeof rest.ref
) {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return (
    <Box
      ref={ref}
      as={Element}
      display={display}
      direction={direction}
      {...rest}
    />
  );
});
