"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";

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
    <Container
      ref={screenRef}
      width="4/12"
      height="full"
      className="lg:w-6/12 float-left hidden md:block opacity-0"
    >
      <Flex width="full" height="full" justify="center" align="center">
        <Container width="fit" height="fit" centered>
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
        </Container>
      </Flex>
    </Container>
  );
};

export default PausedScreen;
