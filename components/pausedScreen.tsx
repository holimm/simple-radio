"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";

registerGSAP();

const PausedScreen = () => {
  const screenRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(screenRef.current, { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          screenRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power1.inOut" }
        );
      });
    },
    { scope: screenRef }
  );

  return (
    <div
      ref={screenRef}
      className="w-4/12 lg:w-6/12 h-full float-left hidden md:block opacity-0"
    >
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-fit h-fit mx-auto">
          <img
            src="/image/icon/pauseGIF.gif"
            alt="PausedGIF"
            className="w-32 h-32 lg:w-52 lg:h-52 bg-cover bg-center rounded-3xl"
          />
          <p
            className="text-4xl text-white text-center mt-5"
            style={{ fontFamily: "Barlow Condensed" }}
          >
            Paused
          </p>
        </div>
      </div>
    </div>
  );
};

export default PausedScreen;
