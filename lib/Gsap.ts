"use client";

import gsap from "gsap";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") {
    return gsap;
  }

  // Plugin registration lives here so components stay free of setup side effects.
  // ScrollTrigger can be added here later if scroll-based motion is introduced.
  registered = true;
  return gsap;
}

export { gsap };
