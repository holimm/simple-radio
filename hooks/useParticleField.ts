"use client";

import { useEffect, useState } from "react";

const FIELD_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function fieldAllowed() {
  if (!window.matchMedia(FIELD_QUERY).matches) return false;
  if (document.visibilityState === "hidden") return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores > 0 && cores < 4) return false;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") {
    return false;
  }

  return true;
}

export default function useParticleField() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(FIELD_QUERY);
    let frame = 0;

    const update = () => {
      const next = fieldAllowed();
      setEnabled((current) => (current === next ? current : next));
    };

    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return enabled;
}
