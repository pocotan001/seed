import { ComponentProps, FC } from "react";
import { vars } from "~/app/_/styles/theme";
import { Box } from "~/app/_/ui/box";

type Props = Omit<ComponentProps<typeof Box<"svg">>, "as" | "ref"> & {
  size?: keyof typeof vars.sizes;
};

export const Icon: FC<Props> = ({
  size = 24,
  display = "inline-block",
  w = size,
  h = size,
  color = "currentColor",
  verticalAlign = "middle",
  viewBox = "0 0 16 16",
  ...rest
}) => (
  <Box
    as="svg"
    display={display}
    w={w}
    h={h}
    color={color}
    verticalAlign={verticalAlign}
    viewBox={viewBox}
    {...rest}
  />
);
