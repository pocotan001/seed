import { FORM_ERROR, FormApi } from "final-form";
import createDecorator from "final-form-focus";
import * as React from "react";
import { Form as FinalForm, FormProps } from "react-final-form";

type IFormValues = any;

export type IFormOnSubmit = (
  values: IFormValues,
  form: FormApi
) => Promise<void | string> | void | string;

interface IFormProps
  extends Overwrite<
      FormProps,
      {
        initialValues?: IFormValues;
        onSubmit: IFormOnSubmit;
      }
    > {}

const focusOnErrors = createDecorator();

export default class Form extends React.PureComponent<IFormProps> {
  handleSubmit = async (values: IFormValues, form: FormApi): Promise<any> => {
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
