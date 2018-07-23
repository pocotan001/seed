import { FormApi } from "final-form";
import createDecorator from "final-form-focus";
import * as React from "react";
import { Form as FinalForm, FormProps } from "react-final-form";

type IFormValues = any;

interface ISubmitErrors {
  [name: string]: string;
}

interface IFormProps
  extends Overwrite<
      FormProps,
      {
        initialValues?: IFormValues;
        onSubmit: (
          values: IFormValues,
          form: FormApi,
          callback?: (errors?: ISubmitErrors) => void
        ) => Promise<ISubmitErrors | void> | ISubmitErrors | void;
      }
    > {}

const focusOnErrors = createDecorator();
const Form: React.SFC<IFormProps> = props => (
  <FinalForm decorators={[focusOnErrors]} {...props} />
);

export default Form;
