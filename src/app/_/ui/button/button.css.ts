import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "~/app/_/styles/theme";

const hues = ["pink", "gray"] as const;

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    border: "1px solid transparent",
    cursor: "pointer",
    alignItems: "center",
    borderRadius: vars.radii.sm,
    fontWeight: "normal",
    justifyContent: "center",
    textDecoration: "none",
    userSelect: "none",
    verticalAlign: "middle",

    ":disabled": {
      opacity: "0.4",
      cursor: "default",
      pointerEvents: "none",
    },
  },

  variants: {
    variant: {
      solid: {},
      outline: {},
      text: {},
    },

    color: Object.fromEntries(
      hues.map((hue) => [hue, vars.colors[`${hue}.500`]])
    ) as Record<(typeof hues)[number], any>,

    size: {
      sm: {
        padding: `${vars.space[4]} ${vars.space[12]}`,
        fontSize: vars.fontSizes[12],
      },

      md: {
        padding: `${vars.space[4]} ${vars.space[16]}`,
        fontSize: vars.fontSizes[16],
      },

      lg: {
        padding: `${vars.space[8]} ${vars.space[20]}`,
        fontSize: vars.fontSizes[18],
      },
    },
  },

  compoundVariants: hues.flatMap((hue) => [
    {
      variants: {
        variant: "solid",
        color: hue,
      },

      style: {
        color: vars.colors.white,
        backgroundColor: vars.colors[`${hue}.500`],

        ":hover": {
          backgroundColor: vars.colors[`${hue}.600`],
        },
      },
    },

    {
      variants: {
        variant: "outline",
        color: hue,
      },

      style: {
        color: vars.colors[`${hue}.500`],
        borderColor: vars.colors[`${hue}.500`],

        ":hover": {
          backgroundColor: vars.colors[`${hue}.50`],
        },
      },
    },

    {
      variants: {
        variant: "text",
        color: hue,
      },

      style: {
        color: vars.colors[`${hue}.500`],

        ":hover": {
          backgroundColor: vars.colors[`${hue}.50`],
        },
      },
    },
  ]),

  defaultVariants: {
    variant: "solid",
    color: "pink",
    size: "md",
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;
