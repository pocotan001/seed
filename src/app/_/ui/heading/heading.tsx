import { ComponentProps, ElementType, ReactElement } from "react";
import { Box } from "~/app/_/ui/box";

const DEFAULT_ELEMENT = "h1" satisfies ElementType;

type Props<E extends ElementType> = ComponentProps<typeof Box<E>>;

export const Heading = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  fontSize = 20,
  fontWeight = "bold",
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return (
    <Box as={Element} fontSize={fontSize} fontWeight={fontWeight} {...rest} />
  );
};
