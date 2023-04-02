import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { Stack } from "~/app/_/ui/stack";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Skeleton } from "./skeleton";

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: "UI / Feedback / Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: ["w", "maxW", "h", "maxH", "rounded"],
  }),
};

export const Basic: Story = {
  render: (args) => (
    <Stack direction="row" items="center" gap={16}>
      <Skeleton w={64} h={64} rounded="full" {...args} />
      <Stack flex={1} gap={12}>
        <Skeleton {...args} />
        <Skeleton w="2/3" {...args} />
      </Stack>
    </Stack>
  ),
};

export default meta;
