import { Meta, StoryObj } from "@storybook/react";
import { ImageLoader } from "next/image";
import { systemProps } from "~/app/_/styles/system.css";
import { AspectRatio } from "~/app/_/ui/aspect-ratio";
import { createArgTypesBySprinkleProps } from "~/lib/storybook";
import { Image } from "./image";

type Story = StoryObj<typeof Image>;

const meta: Meta<typeof Image> = {
  title: "UI / Data Display / Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: createArgTypesBySprinkleProps(systemProps, {
    alwaysShow: ["objectFit", "objectPosition", "rounded"],
  }),
};

const loremPicsumLoader: ImageLoader = ({ src, width }) =>
  `https://picsum.photos/id/${src}/${width}.webp`;

export const Basic: Story = {
  args: {
    loader: loremPicsumLoader,
    src: "1025",
    alt: "Lorem Ipsum for photos",
    width: 200,
    height: 200,
  },
  // eslint-disable-next-line jsx-a11y/alt-text
  render: (args) => <Image {...args} />,
};

export const BorderRadius: Story = {
  args: {
    loader: loremPicsumLoader,
    src: "1025",
    alt: "Lorem Ipsum for photos",
    width: 200,
    height: 200,
    rounded: "full",
  },
  // eslint-disable-next-line jsx-a11y/alt-text
  render: (args) => <Image {...args} />,
};

export const Fill: Story = {
  args: {
    loader: loremPicsumLoader,
    src: "1025",
    alt: "Lorem Ipsum for photos",
    fill: true,
    objectFit: "cover",
    objectPosition: "top",
  },
  render: (args) => (
    <AspectRatio ratio="16/9" maxW={640}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...args} />
    </AspectRatio>
  ),
};

export default meta;
