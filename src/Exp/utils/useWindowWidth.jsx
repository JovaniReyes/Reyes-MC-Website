// hooks/useWindowWidth.ts
import { useSyncExternalStore } from "react";

export function useWindowWidth() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth,                       // client
    () => 1920                                     // server / SSR fallback
  );
}
