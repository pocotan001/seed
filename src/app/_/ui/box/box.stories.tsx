import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Box } from "./box";

type Story = StoryObj<typeof Box>;

const meta: Meta<typeof Box> = {
  title: "UI / Layout / Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, { alwaysShow: true }),
};

export const Basic: Story = {
  args: {
    bg: "pink.500",
    color: "white",
    p: 24,
  },
  render: (args) => (
    <Box {...args}>
      As a CSS utility component, the Box also supports all system properties.
      <br />
      You can use them as prop directly on the component.
    </Box>
  ),
};

export const AsProp: Story = {
  args: {
    as: "button",
    bg: "pink.500",
    color: "white",
    px: 20,
    py: 8,
    rounded: "md",
  },
  render: (args) => <Box {...args}>Box as a button</Box>,
};

export const ResponsiveValues: Story = {
  args: {
    fontSize: { base: 14, tablet: 24, desktop: 36 },
    bg: "pink.500",
    color: "white",
    p: 24,
  },
  render: (args) => (
    <Box {...args}>
      Box allows you to provide object values to add mobile-first responsive
      styles.
    </Box>
  ),
};

export default meta;
