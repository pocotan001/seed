import { ArgTypes, InputType } from "@storybook/types";

type SprinkleProps = {
  styles: { [kay: string]: any };
};

type Options<P extends SprinkleProps> = {
  include?: (keyof P["styles"])[];
  forward?: (keyof P["styles"])[];
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
        if (options.include && !options.include.includes(key)) {
          const inputType: InputType = {
            table: {
              disable: true,
            },
          };

          return [key, inputType];
        }

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
        };

        return [key, inputType];
      })
  ),
  ...(options.include && {
    other: {
      name:
        options.include.length === 0
          ? "It also supports all system props"
          : "All other system props",
    },
  }),
});
