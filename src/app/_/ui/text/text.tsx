import { ComponentProps, ElementType, ReactElement } from "react";
import { cx } from "~/app/_/styles/utils/cx";
import { Box } from "~/app/_/ui/box";
import { Merge } from "~/lib/types";
import { textRecipe, TextVariants } from "./text.css";

const DEFAULT_ELEMENT = "p" satisfies ElementType;

type Props<E extends ElementType> = Merge<
  ComponentProps<typeof Box<E>>,
  TextVariants & { as?: E }
>;

export const Text = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  lineClamp,
  className,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const classes = cx(textRecipe({ lineClamp }), className);

  return <Box as={Element} className={classes} {...rest} />;
};
