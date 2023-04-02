import NextLink from "next/link";
import { ComponentProps, ElementType, ReactElement } from "react";
import { cx } from "~/app/_/styles/utils/cx";
import { Box } from "~/app/_/ui/box";
import { Merge } from "~/lib/types";
import { linkRecipe, LinkVariants } from "./link.css";

const DEFAULT_ELEMENT = NextLink satisfies ElementType;

type Props<E extends ElementType> = Merge<
  ComponentProps<typeof Box<E>>,
  LinkVariants & { as?: E }
>;

export const Link = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  underline,
  className,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const classes = cx(linkRecipe({ underline }), className);

  return <Box as={Element} className={classes} {...rest} />;
};
