import { Meta, StoryObj } from "@storybook/react";
import { systemProps } from "~/app/_/styles/system.css";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Text } from "./text";

type Story = StoryObj<typeof Text>;

const PLACEHOLDER_TEXT =
  "あの南の湖にタッシーっていう生き物がいるって話…ねぇ。ぼくは、模型のおもちゃが浮かんでるだけのデッチ上げだと思うな。おれ眠いよ。もうおしっこして寝ようよ。タッシーのうわさよりすごいのは「ストーンヘンジ」の巨人族の話だよな。ほんとに見たって人が何人もいるらしいよ。一番知りたいのは「ストーンヘンジ」の中心がどこかにつながる入り口だっていううわさかな。いつかぼくらで調べてみたいもんだよねぇ。";

const meta: Meta<typeof Text> = {
  title: "UI / Typography / Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: [
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
  render: (args) => <Text {...args}>{PLACEHOLDER_TEXT}</Text>,
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
  },
  render: (args) => <Text {...args}>{PLACEHOLDER_TEXT}</Text>,
};

export default meta;
