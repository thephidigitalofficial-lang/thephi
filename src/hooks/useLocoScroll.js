// useLocoScroll.js
import { useEffect, useRef } from "react";

export default function useLocoScroll(enabled = true, options = {}) {
  const locoRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    let LocomotiveScroll;
    let scroll;

    const init = async () => {
      // dynamic import so SSR doesn't break
      LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        // sensible defaults -- override via options param
        multiplier: options.multiplier ?? 1,
        smartphone: options.smartphone ?? { smooth: false },
        tablet: options.tablet ?? { smooth: true },
        // ...other locomotive options
        ...options,
      });

      locoRef.current = scroll;
    };

    init();

    // Recalculate when window loads (images, fonts)
    const onLoad = () => locoRef.current?.update?.();
    window.addEventListener("load", onLoad);

    // cleanup
    return () => {
      window.removeEventListener("load", onLoad);
      if (locoRef.current) {
        locoRef.current.destroy();
        locoRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]); // reinit only when enabled changes

  // expose update method if needed
  return {
    update: () => locoRef.current?.update?.(),
  };
}
