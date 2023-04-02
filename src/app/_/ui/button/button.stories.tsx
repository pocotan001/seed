import { Meta, StoryObj } from "@storybook/react";
import NextLink from "next/link";
import { systemProps } from "~/app/_/styles/system.css";
import { Stack } from "~/app/_/ui/stack";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Button } from "./button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "UI / Inputs / Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: [],
    forward: ["color"],
  }),
};

export const Basic: Story = {
  render: (args) => (
    <Stack direction="row" items="center" gap={16}>
      <Button {...args}>Default</Button>
      <Button disabled {...args}>
        Disabled
      </Button>
      <Button as={NextLink} href="#" {...args}>
        Link
      </Button>
    </Stack>
  ),
};

export const Variant: Story = {
  render: (args) => (
    <Stack direction="row" items="center" gap={16}>
      <Button variant="solid" {...args}>
        Solid
      </Button>
      <Button variant="outline" {...args}>
        Outline
      </Button>
      <Button variant="text" {...args}>
        Text
      </Button>
    </Stack>
  ),
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" items="center" gap={16}>
      <Button color="pink" {...args}>
        Pink
      </Button>
      <Button color="gray" {...args}>
        Gray
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" items="center" gap={16}>
      <Button size="sm" {...args}>
        Small
      </Button>
      <Button size="md" {...args}>
        Medium
      </Button>
      <Button size="lg" {...args}>
        Large
      </Button>
    </Stack>
  ),
};

export default meta;
