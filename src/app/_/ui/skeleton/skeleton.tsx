import { ComponentProps, ElementType, ReactElement } from "react";
import { cx } from "~/app/_/styles/utils/cx";
import { Box } from "~/app/_/ui/box";
import * as styles from "./skeleton.css";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = ComponentProps<typeof Box<E>>;

export const Skeleton = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  className,
  h = 16,
  bg = "gray.200",
  rounded = "sm",
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const classes = cx(styles.skeleton, className);

  return (
    <Box
      as={Element}
      className={classes}
      h={h}
      bg={bg}
      rounded={rounded}
      {...rest}
    />
  );
};
