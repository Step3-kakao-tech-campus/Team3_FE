import { RefObject, useEffect, useMemo } from "react";

function useIntersectionObserver(
  targetRef: RefObject<HTMLElement>,
  handleIntersect: ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => any,
) {
  const observer = useMemo(() => new IntersectionObserver(handleIntersect), [handleIntersect]);

  useEffect(() => {
    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      return observer.disconnect();
    };
  }, [targetRef, observer]);
}

export default useIntersectionObserver;
