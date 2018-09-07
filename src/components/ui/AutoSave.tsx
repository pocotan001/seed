import { isEqual } from "lodash";
import * as React from "react";
import { FormSpy, FormSpyRenderProps } from "react-final-form";
import { debounce } from "~/infra/decorators";

interface AdditionalProps {
  onRequestSave: (values: any) => void | Promise<void>;
}

interface AutoSaveProps extends FormSpyRenderProps, AdditionalProps {}

interface AutoSaveState {
  values: { [name: string]: string };
  isSaved: boolean;
}

/**
 * Automatically submit form values after a debounce period
 *
 * @example
 * const save = values => { ... };
 *
 * <Form>
 *   <AutoSave onRequestSave={save} />
 *   ...
 * </Form>
 */
class AutoSave extends React.PureComponent<AutoSaveProps, AutoSaveState> {
  static getDerivedStateFromProps(
    nextProps: AutoSaveProps,
    prevState: AutoSaveState
  ): Partial<AutoSaveState> | null {
    const { values } = prevState;

    if (!isEqual(values, nextProps.values)) {
      return {
        values: nextProps.values,
        isSaved: false
      };
    }

    return null;
  }

  state = {
    values: this.props.values,
    isSaved: false
  };

  componentDidUpdate(_: AutoSaveProps, prevState: AutoSaveState) {
    const { values } = this.state;

    if (prevState.values !== values) {
      this.save();
    }
  }

  componentWillUnmount() {
    (this.save as any).cancel();
  }

  @debounce(1000)
  async save() {
    const { onRequestSave } = this.props;

    await onRequestSave(this.state.values);
    this.setState({ isSaved: true });
  }

  render() {
    // Doesn't have to render anything, but it can render saved state
    // `return this.state.isSaved && <p>Saved</p>`
    return null;
  }
}

const AdaptedAutoSave: React.SFC<AdditionalProps> = props => (
  <FormSpy
    {...props}
    subscription={{ values: true }}
    component={AutoSave as any}
  />
);

export default AdaptedAutoSave;
