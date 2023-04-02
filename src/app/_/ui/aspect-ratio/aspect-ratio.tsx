import { ComponentProps, ElementType, forwardRef, ReactElement } from "react";
import { Box } from "~/app/_/ui/box";
import { RequiredBy } from "~/lib/types";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = RequiredBy<
  ComponentProps<typeof Box<E>>,
  "ratio"
>;

export const AspectRatio: <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: Props<E>
) => ReactElement | null = forwardRef(function AspectRatio<
  E extends ElementType = typeof DEFAULT_ELEMENT
>(
  { as, position = "relative", overflow = "hidden", ...rest }: Props<E>,
  ref: typeof rest.ref
) {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return (
    <Box
      ref={ref}
      as={Element}
      position={position}
      overflow={overflow}
      {...rest}
    />
  );
});
