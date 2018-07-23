import * as React from "react";
import {
  Field as FinalField,
  FieldProps,
  FieldRenderProps
} from "react-final-form";

interface IFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value">,
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
    > {}

export interface IFieldRenderProps
  extends FieldRenderProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      keyof FieldRenderProps["input"]
    > {}

const withField = <P extends {}>(
  Component: React.ComponentType<IFieldRenderProps & P>
) => {
  const Field: React.SFC<IFieldProps & P> = props => (
    <FinalField {...props} component={Component} />
  );

  Field.displayName = `withField(${Component.displayName || Component.name})`;

  return Field;
};

export default withField;
