import { ComponentProps, ElementType, ReactElement } from "react";
import { cx } from "~/app/_/styles/utils/cx";
import { Box } from "~/app/_/ui/box";
import { Merge } from "~/lib/types";
import { buttonRecipe, ButtonVariants } from "./button.css";

const DEFAULT_ELEMENT = "button" satisfies ElementType;

type Props<E extends ElementType> = Merge<
  ComponentProps<typeof Box<E>>,
  ButtonVariants & { as?: E }
>;

export const Button = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  color,
  variant,
  size,
  className,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const classes = cx(buttonRecipe({ color, variant, size }), className);

  if (as === DEFAULT_ELEMENT) {
    return (
      <Box as={DEFAULT_ELEMENT} className={classes} type="button" {...rest} />
    );
  }

  return <Box as={Element} className={classes} {...rest} />;
};
