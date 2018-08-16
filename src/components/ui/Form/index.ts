import AutoSave from "./AutoSave";
import CheckBox from "./CheckBox";
import _Form from "./Form";
import Radio from "./Radio";
import Select from "./Select";
import SubmitError from "./SubmitError";
import TextArea from "./TextArea";
import TextField from "./TextField";
import ValidationError from "./ValidationError";

const Form: typeof _Form & {
  AutoSave: typeof AutoSave;
  CheckBox: typeof CheckBox;
  Radio: typeof Radio;
  Select: typeof Select;
  SubmitError: typeof SubmitError;
  TextArea: typeof TextArea;
  TextField: typeof TextField;
  ValidationError: typeof ValidationError;
} = _Form as any;

Form.AutoSave = AutoSave;
Form.CheckBox = CheckBox;
Form.Radio = Radio;
Form.Select = Select;
Form.SubmitError = SubmitError;
Form.TextArea = TextArea;
Form.TextField = TextField;
Form.ValidationError = ValidationError;

export default Form;
