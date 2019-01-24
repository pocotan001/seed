import React from "react";

export interface NetworkStatus {
  isOnline: boolean;
}

const useNetworkStatus = (): NetworkStatus => {
  const [isOnline, setOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  return {
    isOnline
  };
};

export default useNetworkStatus;
