import { FieldProps, FieldRenderProps } from "react-final-form";

export type FieldProps<P extends any> = Omit<P, "name" | "value"> &
  Pick<
    FieldProps,
    | "allowNull"
    | "format"
    | "formatOnBlur"
    | "parse"
    | "name"
    | "isEqual"
    | "subscription"
    | "validate"
    | "value"
  >;

export type FieldRenderProps<P extends any> = FieldRenderProps &
  Omit<P, keyof FieldRenderProps["input"]>;

export { Field } from "react-final-form";
