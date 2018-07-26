import { FormApi } from "final-form";
import createDecorator from "final-form-focus";
import * as React from "react";
import { Form as FinalForm, FormProps } from "react-final-form";

type IFormValues = any;

interface ISubmitErrors {
  [name: string]: string;
}

export type IFormOnSubmit = (
  values: IFormValues,
  form: FormApi
) => Promise<ISubmitErrors | void> | ISubmitErrors | void;

interface IFormProps
  extends Overwrite<
      FormProps,
      {
        initialValues?: IFormValues;
        onSubmit: IFormOnSubmit;
      }
    > {}

const focusOnErrors = createDecorator();
const Form: React.SFC<IFormProps> = props => (
  <FinalForm decorators={[focusOnErrors]} {...props} />
);

export default Form;
