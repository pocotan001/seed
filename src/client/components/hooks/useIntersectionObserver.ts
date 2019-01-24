import React from "react";

export interface IntersectionObserver {
  isIntersecting: boolean;
}

const useIntersectionObserver = (
  target: React.RefObject<Element>,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      if (isIntersecting !== entry.isIntersecting) {
        setIntersecting(entry.isIntersecting);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  });

  return {
    isIntersecting
  };
};

export default useIntersectionObserver;
