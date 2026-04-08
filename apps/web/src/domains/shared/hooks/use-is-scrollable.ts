import { useEffect, useRef, useState } from "react";

export function useIsScrollable() {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => setIsScrollable(el.scrollHeight > el.clientHeight);

    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();

    return () => ro.disconnect();
  }, []);

  return { ref, isScrollable };
}
