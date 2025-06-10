// utils/useModalBottom.ts
import { useState, useLayoutEffect, useCallback } from "react";

export function useModalBottom(offset = 20) {
  const [bottom, setBottom] = useState(0);

  const measure = useCallback(() => {
    const el = document.querySelector<HTMLElement>(".modal");
    if (!el) {                       // modal not yet in DOM
      setBottom(0);
      return;
    }
    setBottom(el.getBoundingClientRect().bottom + offset);
  }, [offset]);

  useLayoutEffect(() => {
    measure();                       // ① initial (may still be 0)

    // ② re-measure on window resize
    window.addEventListener("resize", measure);

    // ③ watch the modal itself for animation-end / height change
    const el = document.querySelector<HTMLElement>(".modal");
    const ro = el ? new ResizeObserver(measure) : null;
    if (el && ro) ro.observe(el);

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure]);

  return bottom;                     // 0 while modal absent, >0 afterwards
}
