import { recipe, RecipeVariants } from "@vanilla-extract/recipes";

export const slideRecipe = recipe({
  base: {
    position: "fixed",
    transitionProperty: "transform visibility",
  },

  variants: {
    state: {
      enter: {
        transform: "none",
      },

      exit: {
        visibility: "hidden",
      },
    },

    direction: {
      top: {},
      bottom: {},
      left: {},
      right: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        direction: "top",
      },

      style: {
        top: 0,
        right: 0,
        left: 0,
      },
    },
    {
      variants: {
        direction: "bottom",
      },

      style: {
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    {
      variants: {
        direction: "left",
      },

      style: {
        top: 0,
        bottom: 0,
        left: 0,
      },
    },
    {
      variants: {
        direction: "right",
      },

      style: {
        top: 0,
        right: 0,
        bottom: 0,
      },
    },
    {
      variants: {
        state: "exit",
        direction: "top",
      },

      style: {
        transform: "translateY(-100%)",
      },
    },
    {
      variants: {
        state: "exit",
        direction: "bottom",
      },

      style: {
        transform: "translateY(100%)",
      },
    },
    {
      variants: {
        state: "exit",
        direction: "left",
      },

      style: {
        transform: "translateX(-100%)",
      },
    },
    {
      variants: {
        state: "exit",
        direction: "right",
      },

      style: {
        transform: "translateX(100%)",
      },
    },
  ],

  defaultVariants: {
    direction: "top",
  },
});

export type SlideVariants = NonNullable<RecipeVariants<typeof slideRecipe>>;
