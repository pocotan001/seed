import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Container } from "./container";

type Story = StoryObj<typeof Container>;

const meta: Meta<typeof Container> = {
  title: "UI / Layout / Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: ["maxW", "p"],
  }),
};

export const Basic: Story = {
  args: {
    maxW: 640,
    p: 24,
  },
  render: (args) => (
    <Container bg="pink.500" color="white" {...args}>
      まだ会ったことのない仲間に呼びかけます。
      <br />
      まだ会ったことのないわたし達の仲間に呼びかけます！
      <br />
      ジェフ！ジェフ！あなたの助けがほしい…。
      <br />
      わたしはポーラ。そしてもうひとり、ネス････
      <br />
      あなたに呼びかけています。
    </Container>
  ),
};

export default meta;
