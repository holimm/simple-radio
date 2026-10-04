"use client";

import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";

registerGSAP();

type TopNavigationProps = {
  channel: string;
  channelUrl: string;
  onBack: () => void;
};

const TopNavigation = forwardRef<HTMLParagraphElement, TopNavigationProps>(
  ({ channel, channelUrl, onBack }, titleRef) => {
    const navRef = useRef<HTMLElement>(null);

    useGSAP(
      () => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(navRef.current, { autoAlpha: 1 });
        });

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.fromTo(
            navRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.8, delay: 0.4, ease: "power1.out" }
          );
        });
      },
      { scope: navRef }
    );

    return (
      <header ref={navRef} className="player-top">
        <div className="player-top-brand">
          <button
            type="button"
            className="player-icon-link"
            aria-label="Back to home"
            onClick={onBack}
          >
            <img src="/image/icon/back.svg" alt="" />
          </button>
          <h1 className="player-wordmark">Simple Radio</h1>
          <a
            className="player-icon-link"
            href="https://github.com/holimm/SimpleRadio"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
          >
            <img src="/image/icon/github.svg" alt="" />
          </a>
        </div>
        <div className="player-channel">
          <p ref={titleRef} className="player-channel-name">
            {channel}
          </p>
          <a
            className="player-icon-link"
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open this channel on YouTube"
          >
            <img src="/image/icon/youtube.svg" alt="" />
          </a>
        </div>
      </header>
    );
  }
);

TopNavigation.displayName = "TopNavigation";

export default TopNavigation;
