export interface ServiceWorker {
  isSupported: boolean;
  register(scriptURL: string): void;
  unregister(): Promise<void>;
}

const createServiceWorker = (): ServiceWorker => ({
  get isSupported() {
    return "serviceWorker" in navigator;
  },

  register(scriptURL) {
    if (!this.isSupported) {
      return;
    }

    window.addEventListener("load", () => {
      navigator.serviceWorker.register(scriptURL);
    });
  },

  async unregister() {
    if (!this.isSupported) {
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    registration.unregister();
  }
});

export default createServiceWorker;
