import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { AspectRatio } from "./aspect-ratio";

type Story = StoryObj<typeof AspectRatio>;

const meta: Meta<typeof AspectRatio> = {
  title: "UI / Layout / AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: ["ratio", "w", "maxW"],
  }),
};

const Item: FC<ComponentProps<typeof Box>> = (props) => (
  <Box
    position="absolute"
    inset={0}
    w="full"
    h="full"
    p={24}
    color="white"
    bg="pink.500"
    {...props}
  />
);

export const Basic: Story = {
  args: {
    ratio: "16/9",
    maxW: 640,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <Item>
        まだ会ったことのない仲間に呼びかけます。
        <br />
        まだ会ったことのないわたし達の仲間に呼びかけます！
        <br />
        ジェフ！ジェフ！あなたの助けがほしい…。
        <br />
        わたしはポーラ。そしてもうひとり、ネス････
        <br />
        あなたに呼びかけています。
      </Item>
    </AspectRatio>
  ),
};

export default meta;
