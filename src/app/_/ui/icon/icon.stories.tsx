import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Icon } from "./icon";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "UI / Data Display / Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: ["color"],
  }),
};

export const Basic: Story = {
  args: {
    size: 36,
  },
  render: (args) => (
    <Icon {...args}>
      <path
        fill="currentColor"
        d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5Zm0 1H7.5v3h-6l2.25-3ZM8.5 4V1h3.75l2.25 3h-6ZM8 5h7v10H1V5h7Zm0 2.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982Z"
      />
    </Icon>
  ),
};

export default meta;
