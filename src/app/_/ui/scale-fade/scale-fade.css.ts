import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const scaleFadeRecipe = recipe({
  base: {
    transitionProperty: "transform opacity",
  },

  variants: {
    state: {
      enter: {
        transform: "none",
        opacity: "1",
      },

      exit: {
        transform: "scale(0.9)",
        opacity: "0",
      },
    },
  },
});

export type ScaleFadeVariants = NonNullable<
  RecipeVariants<typeof scaleFadeRecipe>
>;
