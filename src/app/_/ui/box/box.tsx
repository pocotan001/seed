import {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  PropsWithRef,
  ReactElement,
} from "react";
import { system, SystemProps } from "~/app/_/styles/system.css";
import { cx } from "~/app/_/styles/utils/cx";
import { Merge } from "~/lib/types";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = Merge<
  E extends keyof JSX.IntrinsicElements
    ? PropsWithRef<JSX.IntrinsicElements[E]>
    : ComponentPropsWithRef<E>,
  SystemProps & { as?: E }
>;

const extractSprinkleProps = <P extends SystemProps>(
  props: P
): [SystemProps, Record<string, unknown>] => {
  const sprinkleProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const key in props) {
    if (system.properties.has(key as keyof SystemProps)) {
      sprinkleProps[key] = props[key];
    } else {
      rest[key] = props[key];
    }
  }

  return [sprinkleProps, rest];
};

export const Box: <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: Props<E>
) => ReactElement | null = forwardRef(function Box<
  E extends ElementType = typeof DEFAULT_ELEMENT
>({ as, className, ...props }: Props<E>, ref: ForwardedRef<Element>) {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const [sprinkleProps, rest] = extractSprinkleProps(props);
  const classes = cx(system(sprinkleProps), className);

  return <Element ref={ref} className={classes} {...rest} />;
});
