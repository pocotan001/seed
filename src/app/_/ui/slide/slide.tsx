import { ComponentProps, ElementType, ReactElement } from "react";
import { Transition } from "~/app/_/ui/transition";
import { Overwrite } from "~/lib/types";
import { SlideVariants, slideRecipe } from "./slide.css";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type Props<E extends ElementType> = Overwrite<
  Omit<ComponentProps<typeof Transition<E>>, "getTransitionClassName">,
  Omit<SlideVariants, "state"> & { as?: E }
>;

export const Slide = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  direction,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;

  return (
    <Transition
      as={Element}
      getTransitionClassName={(state) => slideRecipe({ state, direction })}
      {...rest}
    />
  );
};
