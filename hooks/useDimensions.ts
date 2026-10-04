"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getWidthSnapshot() {
  return window.innerWidth;
}

function getHeightSnapshot() {
  return window.innerHeight;
}

function getServerWidthSnapshot() {
  return 1024;
}

function getServerHeightSnapshot() {
  return 768;
}

export default function useWindowDimensions() {
  const width = useSyncExternalStore(
    subscribe,
    getWidthSnapshot,
    getServerWidthSnapshot
  );
  const height = useSyncExternalStore(
    subscribe,
    getHeightSnapshot,
    getServerHeightSnapshot
  );

  return { width, height };
}
