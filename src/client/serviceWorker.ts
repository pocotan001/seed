export const register = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Will generate by workbox-webpack-plugin
      navigator.serviceWorker.register("/sw.js");
    });
  }
};

export const unregister = async () => {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
      registration.unregister();
    }
  }
};
