import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const textRecipe = recipe({
  variants: {
    lineClamp: {
      none: {
        WebkitLineClamp: "unset",
      },

      1: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "1",
      },

      2: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "2",
      },

      3: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "3",
      },

      4: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "4",
      },

      5: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "5",
      },

      6: {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "6",
      },
    },
  },
});

export type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;
