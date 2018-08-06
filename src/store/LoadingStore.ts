import { action } from "mobx";
import { sleep } from "~/infra/utils";
import Store from "./Store";

const DURATION = 5000;
const CUT = 10000 / Math.floor(DURATION);
const PROGRESS_MAX = 90;

export default class LoadingStore extends Store {
  @action
  increase(n: number) {
    const percent = Math.min(
      this.state.loading.percent + Math.floor(n),
      PROGRESS_MAX
    );

    this.state.loading.percent = percent;
  }

  @action
  async start() {
    this.state.loading = {
      ...this.state.loading,
      percent: 0,
      hidden: false
    };

    while (
      !this.state.loading.hidden &&
      this.state.loading.percent < PROGRESS_MAX
    ) {
      // tslint:disable-next-line:insecure-random
      this.increase(CUT * Math.random());
      await sleep(200);
    }
  }

  @action
  async finish() {
    this.state.loading.percent = 100;
    await sleep(500);

    if (this.state.loading.percent !== 100) {
      return;
    }

    this.state.loading.hidden = true;
    await sleep(300);

    if (!this.state.loading.hidden) {
      return;
    }

    this.state.loading.percent = 0;
  }
}
