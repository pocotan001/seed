import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Grid } from "./grid";

type Story = StoryObj<typeof Grid>;

const meta: Meta<typeof Grid> = {
  title: "UI / Layout / Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    include: [
      "cols",
      "rows",
      "flow",
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
    cols: 4,
  },
  render: (args) => (
    <Grid {...args}>
      <Item>01</Item>
      <Item>02</Item>
      <Item>03</Item>
      <Item>04</Item>
      <Item>05</Item>
      <Item>06</Item>
      <Item>07</Item>
    </Grid>
  ),
};

export const SpanningColumns: Story = {
  args: {
    gap: 16,
    cols: 4,
  },
  render: (args) => (
    <Grid {...args}>
      <Item>01</Item>
      <Item>02</Item>
      <Item col={2}>03</Item>
      <Item>04</Item>
      <Item>05</Item>
      <Item>06</Item>
      <Item>07</Item>
    </Grid>
  ),
};

export const SpanningRows: Story = {
  args: {
    gap: 16,
    rows: 3,
    flow: "column",
  },
  render: (args) => (
    <Grid {...args}>
      <Item row="full">01</Item>
      <Item col={2}>02</Item>
      <Item col={2} row={2}>
        03
      </Item>
    </Grid>
  ),
};

export default meta;
