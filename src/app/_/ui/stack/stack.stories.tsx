import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Heading } from "~/app/_/ui/heading";
import { Text } from "~/app/_/ui/text";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Stack } from "./stack";

type Story = StoryObj<typeof Stack>;

const PLACEHOLDER_TEXT =
  "あの南の湖にタッシーっていう生き物がいるって話…ねぇ。ぼくは、模型のおもちゃが浮かんでるだけのデッチ上げだと思うな。おれ眠いよ。もうおしっこして寝ようよ。タッシーのうわさよりすごいのは「ストーンヘンジ」の巨人族の話だよな。ほんとに見たって人が何人もいるらしいよ。";

const meta: Meta<typeof Stack> = {
  title: "UI / Layout / Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: [
      "direction",
      "wrap",
      "justify",
      "items",
      "gap",
      "gapX",
      "gapY",
    ],
  }),
};

const Item: FC<ComponentProps<typeof Box>> = (props) => (
  <Box
    bg="pink.500"
    color="white"
    display="flex"
    fontSize={14}
    items="center"
    justify="center"
    px={20}
    py={8}
    rounded="sm"
    {...props}
  />
);

export const Basic: Story = {
  args: {
    gap: 16,
  },
  render: (args) => (
    <Stack {...args}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  ),
};

export const Direction: Story = {
  args: {
    direction: "row",
    gap: 16,
  },
  render: (args) => (
    <Stack {...args}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  ),
};

export const FlexItems: Story = {
  args: {
    direction: "row",
    gap: 16,
  },
  render: (args) => (
    <Stack {...args}>
      <Item shrink={1} w={240}>
        Shrink
      </Item>
      <Item grow={1}>Grow</Item>
      <Item>None</Item>
    </Stack>
  ),
};

export const PercentageWidths: Story = {
  args: {
    direction: "row",
    gap: 16,
  },
  render: (args) => (
    <Stack gap={16}>
      <Stack {...args}>
        <Item w="1/2">1/2</Item>
        <Item w="1/2">1/2</Item>
      </Stack>
      <Stack {...args}>
        <Item w="2/5">2/5</Item>
        <Item w="3/5">3/5</Item>
      </Stack>
      <Stack {...args}>
        <Item w="1/3">1/3</Item>
        <Item w="2/3">2/3</Item>
      </Stack>
      <Stack {...args}>
        <Item w="1/4">1/4</Item>
        <Item w="3/4">3/4</Item>
      </Stack>
      <Stack {...args}>
        <Item w="1/5">1/5</Item>
        <Item w="4/5">4/5</Item>
      </Stack>
      <Stack {...args}>
        <Item w="1/6">1/6</Item>
        <Item w="5/6">5/6</Item>
      </Stack>
    </Stack>
  ),
};

export const Centering: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    justify: "center",
    items: "center",
  },
  render: (args) => (
    <Stack h="screenY" {...args}>
      <Item fontSize={24} w={128} h={128}>
        🥺
      </Item>
    </Stack>
  ),
};

export const MediaObject: Story = {
  args: {
    direction: "row",
    gap: 16,
  },
  render: (args) => (
    <Stack gap={16}>
      <Stack {...args}>
        <Item w={64} h={64} />
        <Box flex={1}>
          <Heading mb={4}>伝説のタッシー</Heading>
          <Text>{PLACEHOLDER_TEXT}</Text>
        </Box>
      </Stack>

      <Stack {...args}>
        <Item w={64} h={64} order={1} />
        <Box flex={1}>
          <Heading mb={4}>伝説のタッシー</Heading>
          <Text>{PLACEHOLDER_TEXT}</Text>
        </Box>
      </Stack>
    </Stack>
  ),
};

export const HolyGrailLayout: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    gap: 16,
  },
  render: (args) => (
    <Stack h="screenY" {...args}>
      <Item as="header">Header</Item>
      <Stack direction="row" grow={1} gap={16}>
        <Item as="main" order={2} grow={1}>
          Main
        </Item>
        <Item as="nav" order={1} w={160}>
          Nav
        </Item>
        <Item as="aside" order={3} w={160}>
          Aside
        </Item>
      </Stack>
      <Item as="footer">Footer</Item>
    </Stack>
  ),
};

export default meta;
