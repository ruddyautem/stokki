"use client";

import { useEffect } from "react";

/** Lock body scroll while `active` is true. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [active]);
}
