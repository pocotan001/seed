import { RefObject, useEffect, useState } from "react";

export const useIntersectionObserver = <E extends Element>(
  target: RefObject<E>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry) {
        setEntry(entry);
      }
    }, options);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [options, target]);

  return entry;
};
