import NextImage, { ImageProps as NextImageProps } from "next/image";
import { ComponentProps, FC } from "react";
import { SystemProps } from "~/app/_/styles/system.css";
import { Box } from "~/app/_/ui/box";
import { Overwrite } from "~/lib/types";

type DuplicateKey = Extract<keyof SystemProps, keyof NextImageProps>;
type ForwardPropKey = Extract<DuplicateKey, "width" | "height">;

type Props = Overwrite<
  Omit<ComponentProps<typeof Box<typeof NextImage>>, "as">,
  Pick<NextImageProps, ForwardPropKey>
>;

export const Image: FC<Props> = ({ width, height, ...rest }) => {
  const ForwardedNextImage: FC<Omit<NextImageProps, ForwardPropKey>> = (
    props
  ) => <NextImage width={width} height={height} {...props} />;

  return <Box as={ForwardedNextImage} {...rest} />;
};
