import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "~/app/_/styles/theme";

export const linkRecipe = recipe({
  base: {
    color: vars.colors.currentColor,
    cursor: "pointer",
  },

  variants: {
    underline: {
      true: {
        textDecoration: "underline",

        ":hover": {
          textDecoration: "none",
        },
      },
    },
  },
});

export type LinkVariants = NonNullable<RecipeVariants<typeof linkRecipe>>;
