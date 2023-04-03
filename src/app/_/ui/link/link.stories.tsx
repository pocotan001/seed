import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Link } from "./link";

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = {
  title: "UI / Navigation / Link",
  component: Link,
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
  render: (args) => (
    <Link href="#" {...args}>
      伝説のタッシー
    </Link>
  ),
};

export const Underline: Story = {
  render: (args) => (
    <p>
      Did you know that{" "}
      <Link href="#" underline {...args}>
        links can live inline with text
      </Link>
    </p>
  ),
};

export default meta;
