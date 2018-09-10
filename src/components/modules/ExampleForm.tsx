import { FormApi } from "final-form";
import { omit } from "lodash";
import { inject, observer } from "mobx-react";
import * as React from "react";
import {
  AutoSave,
  Button,
  CheckBox,
  Form,
  Paragraph,
  Radio,
  Select,
  Space,
  TextArea,
  TextField
} from "~/components/ui";
import { RootStore } from "~/store";
import { SessionKey } from "~/store/state";
import { sleep } from "~/utils";

interface Values {
  text: string;
  password: string;
  select: string;
  multiple: string[];
  checkbox: string[];
  radio: string;
  textarea: string;
}

interface ExampleFormState {
  initialValues: Partial<Values>;
}

@inject("store")
@observer
export default class ExampleForm extends React.Component<{}, ExampleFormState> {
  store: RootStore = (this.props as any).store;

  state = {
    initialValues: {}
  };

  save = (values: Values) => {
    this.store.session.set(SessionKey.ExampleForm, omit(values, ["password"]));
  };

  handleSubmit = async (
    _: Values,
    { reset }: FormApi
  ): Promise<void | string> => {
    await sleep(3000);

    // Reset form after submit
    setTimeout(() => {
      reset({});
    }, 0);
  };

  componentDidMount() {
    const initialValues = this.store.state.session[SessionKey.ExampleForm];

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
              <TextField
                id="text"
                name="text"
                placeholder="text"
                autoComplete="off"
              />
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="password">Password</label>
              </Paragraph>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="password"
                autoComplete="new-password"
              />
            </Space>

            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="select">Select</label>
              </Paragraph>
              <Select id="select" name="select" placeholder="-">
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
              <Button ml={12} onClick={form.reset}>
                Reset
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}
