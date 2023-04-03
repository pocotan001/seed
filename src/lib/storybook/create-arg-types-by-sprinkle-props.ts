import { ArgTypes, InputType } from "@storybook/types";

type SprinkleProps = {
  styles: { [kay: string]: any };
};

type Options<P extends SprinkleProps> = {
  forward?: (keyof P["styles"])[];
  alwaysShow?: boolean | (keyof P["styles"])[];
};

/**
 * @vanilla-extract/sprinkles のプロパティから ArgTypes を生成する
 */
export const createArgTypesBySprinkleProps = <P extends SprinkleProps>(
  sprinkleProps: P,
  options: Options<P> = {}
): ArgTypes => ({
  ...Object.fromEntries(
    Object.entries(sprinkleProps.styles)
      .filter(([key]) => !options.forward?.includes(key))
      .map(([key, prop]) => {
        const ifConditional: InputType["if"] =
          options.alwaysShow === true ||
          (Array.isArray(options.alwaysShow) &&
            options.alwaysShow.includes(key))
            ? undefined
            : { arg: "showAll" };

        // in shorthand case
        if (prop.mappings) {
          const inputType: InputType = {
            description: `Shorthand for "${prop.mappings}" props`,
            type: {
              name: "enum",
              value: Object.keys(
                sprinkleProps.styles[prop.mappings[0]].values
              ).map((key) => (Number.isNaN(Number(key)) ? key : Number(key))),
            },
            if: ifConditional,
          };

          return [key, inputType];
        }

        const inputType: InputType = {
          type: {
            name: "enum",
            value: Object.keys(prop.values).map((key) =>
              Number.isNaN(Number(key)) ? key : Number(key)
            ),
          },
          if: ifConditional,
        };

        return [key, inputType];
      })
  ),
  ...(options.alwaysShow !== true && {
    showAll: {
      name: "Show all system props",
      type: "boolean",
      // FIXME: Displaying as blank in preview
      //        https://github.com/storybookjs/storybook/issues/11983
      defaultValue: false,
    },
  }),
});
