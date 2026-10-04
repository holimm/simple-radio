"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";

registerGSAP();

type ChannelMarqueeProps = {
  playing: boolean;
};

const ChannelMarquee = ({ playing }: ChannelMarqueeProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(pausedRef.current, { autoAlpha: playing ? 0 : 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(pausedRef.current, {
          autoAlpha: playing ? 0 : 1,
          duration: 0.45,
          ease: "power2.out",
        });
      });
    },
    { dependencies: [playing], scope: rootRef }
  );

  return (
    <div ref={rootRef} className="player-paused" aria-hidden={playing}>
      <p ref={pausedRef} className="player-paused-text">
        Paused
      </p>
    </div>
  );
};

export default ChannelMarquee;
