import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Heading } from "./heading";

type Story = StoryObj<typeof Heading>;

const meta: Meta<typeof Heading> = {
  title: "UI / Typography / Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: [
      "fontFamily",
      "fontSize",
      "fontStyle",
      "fontWeight",
      "textAlign",
      "color",
      "textDecoration",
      "textTransform",
      "verticalAlign",
    ],
  }),
};

export const Basic: Story = {
  render: (args) => <Heading {...args}>伝説のタッシー</Heading>,
};

export default meta;
