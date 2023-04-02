import {
  ComponentProps,
  ElementType,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import { Transition as ReactTransition } from "react-transition-group";
import {
  EndHandler,
  TransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition";
import { cx } from "~/app/_/styles/utils/cx";
import { Box } from "~/app/_/ui/box";
import { Merge } from "~/lib/types";
import { TransitionVariants, transitionRecipe } from "./transition.css";

const DEFAULT_ELEMENT = "div" satisfies ElementType;

type SimplifiedTransitionStatus = "enter" | "exit" | undefined;

type Props<E extends ElementType> = Merge<
  ComponentProps<typeof Box<E>>,
  Pick<
    TransitionProps,
    | "in"
    | "mountOnEnter"
    | "unmountOnExit"
    | "onEnter"
    | "onEntering"
    | "onEntered"
    | "onExit"
    | "onExiting"
    | "onExited"
  > &
    TransitionVariants & {
      getTransitionClassName: (
        state: SimplifiedTransitionStatus
      ) => string | undefined;
      as?: E;
    }
>;

const transitionStatusMap: Record<
  TransitionStatus,
  SimplifiedTransitionStatus
> = {
  entering: "enter",
  entered: "enter",
  exiting: "exit",
  exited: "exit",
  unmounted: undefined,
};

export const Transition = <E extends ElementType = typeof DEFAULT_ELEMENT>({
  as,
  in: inProp,
  mountOnEnter,
  unmountOnExit,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  duration,
  easing,
  getTransitionClassName,
  className,
  ...rest
}: Props<E>): ReactElement | null => {
  const Element: ElementType = as ?? DEFAULT_ELEMENT;
  const el = useRef<HTMLElement>();

  const handleEnd: EndHandler<HTMLElement> = useCallback((done) => {
    el.current?.addEventListener("transitionend", done, false);
  }, []);

  return (
    <ReactTransition
      nodeRef={el}
      addEndListener={handleEnd}
      in={inProp}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {(state) => {
        const classes = cx(
          transitionRecipe({ duration, easing }),
          getTransitionClassName(transitionStatusMap[state]),
          className
        );

        return <Box ref={el} as={Element} className={classes} {...rest} />;
      }}
    </ReactTransition>
  );
};
