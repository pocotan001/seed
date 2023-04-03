import {
  ComponentPropsWithRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  PropsWithRef,
  ReactElement,
} from "react";
import { Entries } from "type-fest";
import { system, SystemProps } from "~/app/_/styles/system.css";
import { cx } from "~/app/_/styles/utils/cx";
import { Overwrite } from "~/lib/types";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = Overwrite<
  E extends keyof JSX.IntrinsicElements
    ? PropsWithRef<JSX.IntrinsicElements[E]>
    : ComponentPropsWithRef<E>,
  SystemProps & { as?: E }
>;

const extractSystemProps = <P extends SystemProps>(
  props: P
): [Partial<SystemProps>, Record<string, unknown>] => {
  const systemProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props) as Entries<SystemProps>) {
    if (system.properties.has(key)) {
      systemProps[key] = value;
    } else {
      rest[key] = value;
    }
  }

  return [systemProps, rest];
};

export const Box: <E extends ElementType = typeof DEFAULT_ELEMENT>(
  props: Props<E>
) => ReactElement | null = forwardRef(function Box<
  E extends ElementType = typeof DEFAULT_ELEMENT
>({ as, className, ...props }: Props<E>, ref: ForwardedRef<Element>) {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const [systemProps, rest] = extractSystemProps(props);
  const classes = cx(system(systemProps), className);

  return <Element ref={ref} className={classes} {...rest} />;
});
