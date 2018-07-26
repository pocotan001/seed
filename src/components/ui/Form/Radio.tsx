import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";

type IInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

interface IAdditionalProps extends IMarginProps {
  children?: React.ReactNode;
  theme?: ITheme;
}

const Radio: React.SFC<
  IFieldRenderProps<IInputAttributes> & IAdditionalProps
> = ({ input, meta, className, children, m, mt, mr, mb, ml, ...rest }) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return (
    <label className={className}>
      <input {...input} {...rest} aria-invalid={isInvalid} />
      {children && <span className="label">{children}</span>}
    </label>
  );
};

const StyledRadio = styled(Radio)`
  display: inline-block;
  vertical-align: middle;
  ${margin};

  > input {
    vertical-align: middle;
    margin-right: 8px;
  }

  > .label {
    vertical-align: middle;
  }
`;

const AdaptedRadio: React.SFC<
  IFieldProps<IInputAttributes> & IAdditionalProps
> = props => <Field {...props} type="radio" component={StyledRadio} />;

export default AdaptedRadio;