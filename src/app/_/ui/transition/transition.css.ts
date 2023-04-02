import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const transitionRecipe = recipe({
  variants: {
    duration: {
      75: { transitionDuration: "75ms" },
      100: { transitionDuration: "100ms" },
      150: { transitionDuration: "150ms" },
      200: { transitionDuration: "200ms" },
      300: { transitionDuration: "300ms" },
      500: { transitionDuration: "500ms" },
      700: { transitionDuration: "700ms" },
      1000: { transitionDuration: "1000ms" },
    },

    easing: {
      linear: { transitionTimingFunction: "linear" },
      in: { transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)" },
      out: { transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
      inOut: { transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" },
    },
  },

  defaultVariants: {
    duration: 300,
    easing: "inOut",
  },
});

export type TransitionVariants = NonNullable<
  RecipeVariants<typeof transitionRecipe>
>;
