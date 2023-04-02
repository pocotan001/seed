import { ComponentProps, ElementType, ReactElement } from "react";
import { Transition } from "~/app/_/ui/transition";
import { Merge } from "~/lib/types";
import { scaleFadeRecipe } from "./scale-fade.css";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = Merge<
  Omit<ComponentProps<typeof Transition<E>>, "getTransitionClassName">,
  { as?: E }
>;

export const ScaleFade = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return (
    <Transition
      as={Element}
      getTransitionClassName={(state) => scaleFadeRecipe({ state })}
      {...rest}
    />
  );
};
