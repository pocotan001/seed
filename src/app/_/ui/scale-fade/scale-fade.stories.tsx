import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Button } from "~/app/_/ui/button";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { ScaleFade } from "./scale-fade";

type Story = StoryObj<typeof ScaleFade>;

const meta: Meta<typeof ScaleFade> = {
  title: "UI / Utils / ScaleFade",
  component: ScaleFade,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: [],
  }),
  args: {
    in: false,
    mountOnEnter: false,
    unmountOnExit: false,
    onEnter: action("onEnter"),
    onEntering: action("onEntering"),
    onEntered: action("onEntered"),
    onExit: action("onExit"),
    onExiting: action("onExiting"),
    onExited: action("onExited"),
  },
};

const Item: FC<ComponentProps<typeof Box>> = (props) => (
  <Box
    bg="pink.500"
    display="flex"
    fontSize={24}
    items="center"
    justify="center"
    h={128}
    rounded="sm"
    mt={16}
    {...props}
  />
);

export const Basic: Story = {
  render: (args) => {
    const [{ in: inProp }, updateArgs] =
      useArgs<ComponentProps<typeof ScaleFade>>();

    return (
      <>
        <Button
          aria-controls="example-basic"
          aria-expanded={inProp}
          onClick={() => updateArgs({ in: !inProp })}
        >
          Click Me
        </Button>
        <ScaleFade {...args}>
          <Item id="example-basic">🥺</Item>
        </ScaleFade>
      </>
    );
  },
};

export default meta;
