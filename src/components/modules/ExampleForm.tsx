import { omit } from "lodash";
import { inject, observer } from "mobx-react";
import * as React from "react";
import Button from "~/components/ui/Button";
import {
  AutoSave,
  CheckBox,
  Form,
  IFormOnSubmit,
  Radio,
  Select,
  TextArea,
  TextField
} from "~/components/ui/Form";
import Paragraph from "~/components/ui/Paragraph";
import Space from "~/components/ui/Space";
import { sleep } from "~/infra/utils";
import { RootStore } from "~/store";
import { SessionKey } from "~/store/state";

interface IValues {
  text: string;
  password: string;
  select: string;
  multiple: string[];
  checkbox: string[];
  radio: string;
  textarea: string;
}

interface IExampleFormState {
  initialValues: Partial<IValues>;
}

@inject("store")
@observer
export default class ExampleForm extends React.Component<
  {},
  IExampleFormState
> {
  store: RootStore = (this.props as any).store;

  state = {
    initialValues: {}
  };

  save = (values: IValues) => {
    this.store.session.set(SessionKey.EXAMPLE_FORM, omit(values, ["password"]));
  };

  handleSubmit: IFormOnSubmit = async (_, form) => {
    await sleep(3000);

    // Reset form after submit
    setTimeout(() => {
      form.reset({});
    }, 0);
  };

  componentDidMount() {
    const initialValues = this.store.state.session[SessionKey.EXAMPLE_FORM];

    if (initialValues) {
      this.setState({ initialValues });
    }
  }

  render() {
    return (
      <Form
        initialValues={this.state.initialValues}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, pristine, submitting, form }) => (
          <form onSubmit={handleSubmit}>
            <AutoSave onRequestSave={this.save} />

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="text">Text</label>
              </Paragraph>
              <TextField id="text" name="text" />
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="password">Password</label>
              </Paragraph>
              <TextField id="password" name="password" type="password" />
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="select">Select</label>
              </Paragraph>
              <Select id="select" name="select">
                <option disabled />
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Select>
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="multiple">Multiple select</label>
              </Paragraph>
              <Select id="multiple" name="multiple" multiple>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Select>
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>Check</Paragraph>
              <CheckBox name="checkbox" value="red">
                Red
              </CheckBox>
              <CheckBox name="checkbox" value="green" ml={16}>
                Green
              </CheckBox>
              <CheckBox name="checkbox" value="blue" ml={16}>
                Blue
              </CheckBox>
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>Radio Buttons</Paragraph>
              <Radio name="radio" value="red">
                Red
              </Radio>
              <Radio name="radio" value="green" ml={16}>
                Green
              </Radio>
              <Radio name="radio" value="blue" ml={16}>
                Blue
              </Radio>
            </Space>

            <Space mb={24}>
              <Paragraph mb={8}>
                <label htmlFor="textarea">Text area</label>
              </Paragraph>
              <TextArea id="textarea" name="textarea" />
            </Space>

            <div>
              <Button type="submit" disabled={pristine || submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </Button>
              <Button ml={12} onClick={form.reset.bind(form, {})}>
                Reset
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}
