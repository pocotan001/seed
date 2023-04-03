import { Meta, StoryObj } from "@storybook/react";
import { FC, PropsWithChildren } from "react";
import { systemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Grid } from "~/app/_/ui/grid";
import { Icon } from "~/app/_/ui/icon";
import { Stack } from "~/app/_/ui/stack";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import * as AllIcons from ".";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "UI / Data Display / Icons",
  component: Icon,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: ["color"],
  }),
};

const Container: FC<PropsWithChildren> = ({ children }) => (
  <Grid
    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(10em, 1fr))" }}
    gap={16}
  >
    {children}
  </Grid>
);

const Item: FC<PropsWithChildren<{ name?: string }>> = ({ name, children }) => (
  <Stack gap={8} fontSize={12} textAlign="center">
    <Box bg="gray.100" rounded="sm" p={24}>
      {children}
    </Box>
    {name}
  </Stack>
);

export const Basic: Story = {
  args: {
    size: 36,
  },
  render: (args) => (
    <Container>
      {Object.entries(AllIcons).map(([key, Icon]) => (
        <Item key={key} name={key}>
          <Icon {...args} />
        </Item>
      ))}
    </Container>
  ),
};

export default meta;
