import { useEffect, useState, type RefObject } from "react";

export const useScrollGradient = <T>(scrollRef: RefObject<HTMLElement | null>, deps: T[] = []) => {
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateGradients = () => {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      if (!hasOverflow) {
        setShowTopGradient(false);
        setShowBottomGradient(false);
        return;
      }

      const atTop = element.scrollTop <= 2;
      const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 2;

      setShowTopGradient(!atTop);
      setShowBottomGradient(!atBottom);
    };

    const timer = requestAnimationFrame(updateGradients);
    element.addEventListener("scroll", updateGradients);

    const observer = new ResizeObserver(updateGradients);
    observer.observe(element);

    return () => {
      cancelAnimationFrame(timer);
      element.removeEventListener("scroll", updateGradients);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, scrollRef]);
  return { showTopGradient, showBottomGradient };
};
