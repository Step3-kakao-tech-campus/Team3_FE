import { useEffect, useMemo, useRef } from "react";

function useIntersectionObserver(
  handleIntersect: ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => any,
) {
  const observer = useMemo(() => new IntersectionObserver(handleIntersect), [handleIntersect]);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      return observer.disconnect();
    };
  }, [targetRef, observer]);
  return { targetRef };
}

export default useIntersectionObserver;
