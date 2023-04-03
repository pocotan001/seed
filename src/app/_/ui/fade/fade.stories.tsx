import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Button } from "~/app/_/ui/button";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Fade } from "./fade";

type Story = StoryObj<typeof Fade>;

const meta: Meta<typeof Fade> = {
  title: "UI / Utils / Fade",
  component: Fade,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps),
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
    const [{ in: inProp }, updateArgs] = useArgs<ComponentProps<typeof Fade>>();

    return (
      <>
        <Button
          aria-controls="example-basic"
          aria-expanded={inProp}
          onClick={() => updateArgs({ in: !inProp })}
        >
          Click Me
        </Button>
        <Fade {...args}>
          <Item id="example-basic">🥺</Item>
        </Fade>
      </>
    );
  },
};

export default meta;
