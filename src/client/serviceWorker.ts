export const register = () => {
  // Will generate by workbox-webpack-plugin
  navigator.serviceWorker.register("/sw.js");
};

export const unregister = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();

  for (const registration of registrations) {
    registration.unregister();
  }
};
