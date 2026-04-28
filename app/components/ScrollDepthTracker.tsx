"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

export default function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();

    const handler = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));

      for (const t of THRESHOLDS) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          trackEvent("scroll_depth", {
            percent: t,
            page_path:
              typeof window !== "undefined" ? window.location.pathname : undefined,
          });
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        handler();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
