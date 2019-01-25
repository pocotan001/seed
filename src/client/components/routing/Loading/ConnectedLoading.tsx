import React from "react";
import { connect, MapStateToProps } from "react-redux";
import sleep from "../../../../lib/sleep";
import { State } from "../../../state";
import Loading from "./Loading";

interface StateProps {
  isLoading: boolean;
}

type ConnectedLoadingProps = StateProps;

interface ConnectedLoadingLoadingState {
  hidden: boolean;
  percent: number;
}

const DURATION = 3000;
const CUT = 10000 / Math.floor(DURATION);
const MAX = 90;

const mapStateToProps: MapStateToProps<StateProps, {}, State> = state => ({
  isLoading: state.loading.isLoading
});

export class ConnectedLoading extends React.Component<
  ConnectedLoadingProps,
  ConnectedLoadingLoadingState
> {
  state: ConnectedLoadingLoadingState = {
    hidden: true,
    percent: 0
  };

  timer: NodeJS.Timeout | null = null;

  get isStarted(): boolean {
    return !!this.timer;
  }

  clear(): void {
    if (!this.timer) {
      return;
    }

    clearInterval(this.timer);
    this.timer = null;
  }

  increase(n: number): void {
    this.setState(prevState => ({
      percent: Math.min(prevState.percent + Math.floor(n), MAX)
    }));
  }

  start(): void {
    this.setState({
      hidden: false,
      percent: 0
    });

    this.clear();
    this.timer = setInterval(() => {
      // tslint:disable-next-line:insecure-random
      this.increase(CUT * Math.random());

      if (this.state.percent >= MAX) {
        this.clear();
      }
    }, 200);
  }

  async finish(): Promise<void> {
    this.clear();

    this.setState({ percent: 100 });
    await sleep(500);

    if (this.isStarted) {
      return;
    }

    this.setState({ hidden: true });
    await sleep(300);

    if (this.isStarted) {
      return;
    }

    this.setState({ percent: 0 });
  }

  componentDidUpdate(prevProps: ConnectedLoadingProps): void {
    const { isLoading } = this.props;

    if (!prevProps.isLoading && isLoading) {
      this.start();
    } else if (prevProps.isLoading && !isLoading) {
      this.finish();
    }
  }

  render(): React.ReactNode {
    return <Loading hidden={this.state.hidden} percent={this.state.percent} />;
  }
}

export default connect<StateProps, {}, {}, State>(mapStateToProps)(
  ConnectedLoading
);
