import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const fadeRecipe = recipe({
  base: {
    transitionProperty: "opacity",
  },

  variants: {
    state: {
      enter: {
        opacity: "1",
      },

      exit: {
        opacity: "0",
      },
    },
  },
});

export type FadeVariants = NonNullable<RecipeVariants<typeof fadeRecipe>>;
