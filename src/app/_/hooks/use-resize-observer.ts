import { RefObject, useEffect, useState } from "react";

export const useResizeObserver = <E extends Element>(
  target: RefObject<E>
): ResizeObserverEntry | undefined => {
  const [entry, setEntry] = useState<ResizeObserverEntry>();

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = new window.ResizeObserver(([entry]) => {
      if (entry) {
        setEntry(entry);
      }
    });

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return entry;
};
