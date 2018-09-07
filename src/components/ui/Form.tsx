import { FORM_ERROR, FormApi } from "final-form";
import createDecorator from "final-form-focus";
import * as React from "react";
import {
  Form as FinalForm,
  FormProps as FinalFormProps
} from "react-final-form";

type Values = any;

export type FormOnSubmit = (
  values: Values,
  form: FormApi
) => Promise<void | string> | void | string;

interface FormProps
  extends Overwrite<
      FinalFormProps,
      {
        initialValues?: Values;
        onSubmit: FormOnSubmit;
      }
    > {}

const focusOnErrors = createDecorator();

export default class Form extends React.PureComponent<FormProps> {
  handleSubmit = async (values: Values, form: FormApi): Promise<any> => {
    const { onSubmit } = this.props;
    const err = await onSubmit(values, form);

    if (err) {
      return { [FORM_ERROR]: err };
    }
  };

  render() {
    const { onSubmit, ...rest } = this.props;

    return (
      <FinalForm
        decorators={[focusOnErrors]}
        onSubmit={this.handleSubmit}
        {...rest}
      />
    );
  }
}
