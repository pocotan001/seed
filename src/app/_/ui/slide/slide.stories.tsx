import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Button } from "~/app/_/ui/button";
import { Stack } from "~/app/_/ui/stack";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Slide } from "./slide";

type Story = StoryObj<typeof Slide>;

const meta: Meta<typeof Slide> = {
  title: "UI / Utils / Slide",
  component: Slide,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    forward: ["direction"],
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
    rounded="sm"
    w="full"
    h="full"
    minW={128}
    minH={128}
    {...props}
  />
);

export const Basic: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    direction: "bottom",
  },
  render: (args) => {
    const [{ in: inProp }, updateArgs] =
      useArgs<ComponentProps<typeof Slide>>();

    return (
      <>
        <Stack h="screenY" items="center" justify="center">
          <Button
            aria-controls="example-basic"
            aria-expanded={inProp}
            onClick={() => updateArgs({ in: !inProp })}
          >
            Click Me
          </Button>
        </Stack>
        <Slide {...args}>
          <Item id="example-basic">🥺</Item>
        </Slide>
      </>
    );
  },
};

export default meta;
