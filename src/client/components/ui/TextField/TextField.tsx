import React from "react";
import { WrappedFieldProps } from "redux-form";
import styled from "styled-components";
import margin, { MarginProps } from "../../styles/extends/margin";
import Input from "./Input";
import InvalidMessage from "./InvalidMessage";
import Label from "./Label";

interface OwnProps {
  label?: string;
  className?: string;
}

type TextFieldProps = OwnProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  WrappedFieldProps &
  MarginProps;

const TextField = ({
  label,
  className,
  input,
  meta: { touched, error },
  ...rest
}: TextFieldProps) => {
  const isInvalid = touched && !!error;

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={rest.id}>
          {label}
          {rest.required && " *"}
        </Label>
      )}
      <Input aria-invalid={isInvalid} {...input} {...rest} />
      {isInvalid && <InvalidMessage>{error}</InvalidMessage>}
    </div>
  );
};

export default styled(TextField)`
  font-size: 1rem;

  ${margin};
` as typeof TextField;
