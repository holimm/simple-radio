"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import {
  consumePageTransition,
  markPageTransition,
} from "@/lib/pageTransition";
import NatureSound from "@/components/features/NatureSound";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Section from "@/components/layout/Section";

registerGSAP();

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leavingRef = useRef(false);
  const [mute, setMute] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [leaving, setLeaving] = useState(false);
  const [fromPlayer, setFromPlayer] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const handoff = consumePageTransition("home");
    setFromPlayer(handoff);
    if (handoff) {
      gsap.set(veilRef.current, { autoAlpha: 1 });
      gsap.set(contentRef.current, { opacity: 1 });
      gsap.set([titleRef.current, ctaRef.current], { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    router.prefetch("/MusicStreamer");
  }, [router]);

  const unMute = () => {
    if (mute) {
      setMute(false);
      if (volume === 0) setVolume(0.5);
      return;
    }
    setMute(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = mute;
    video.volume = volume;
    void video.play().catch(() => {});
  }, [mute, volume]);

  const openHomepageTab = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
  };

  useGSAP(
    () => {
      if (fromPlayer === null) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(veilRef.current, { autoAlpha: 0 });
        gsap.set([contentRef.current, titleRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
        });
        gsap.set(videoRef.current, { scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (fromPlayer) {
          gsap.set(veilRef.current, { autoAlpha: 1 });
          gsap.set(contentRef.current, { opacity: 1 });
          gsap.set([titleRef.current, ctaRef.current], {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          });
          gsap.set(videoRef.current, { scale: 1.04 });

          const reveal = gsap.timeline({ defaults: { ease: "power2.out" } });
          reveal.to(veilRef.current, { autoAlpha: 0, duration: 0.7 }, 0);
          reveal.to(videoRef.current, { scale: 1, duration: 1.2 }, 0);
          reveal.to(
            titleRef.current,
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
            0.2
          );
          reveal.to(
            ctaRef.current,
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
            0.35
          );
          return;
        }

        gsap.set(veilRef.current, { autoAlpha: 0 });
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro.fromTo(
          videoRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 2.4, ease: "power2.out" },
          0
        );
        intro.fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          0.15
        );
        intro.fromTo(
          titleRef.current,
          { opacity: 0, y: 36, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
          0.25
        );
        intro.fromTo(
          ctaRef.current,
          { opacity: 0, y: 28, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85 },
          0.7
        );
      });
    },
    { dependencies: [fromPlayer], scope: containerRef }
  );

  useGSAP(
    () => {
      if (!leaving || !veilRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        markPageTransition("player");
        gsap.set(veilRef.current, { autoAlpha: 1 });
        router.push("/MusicStreamer");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        markPageTransition("player");
        router.prefetch("/MusicStreamer");

        const leave = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            router.push("/MusicStreamer");
          },
        });

        leave.to(
          [titleRef.current, ctaRef.current],
          {
            opacity: 0,
            y: -18,
            filter: "blur(10px)",
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.in",
          },
          0
        );
        leave.to(
          videoRef.current,
          { scale: 1.08, duration: 0.7, ease: "power2.in" },
          0
        );
        leave.to(veilRef.current, { autoAlpha: 1, duration: 0.55 }, 0.15);
      });
    },
    { dependencies: [leaving, router], scope: containerRef }
  );

  return (
    <Container ref={containerRef}>
      <div ref={veilRef} className="page-transition-veil" aria-hidden="true" />
      <Container
        width="full"
        height="full"
        overflow="hidden"
        position="absolute"
        className="top-0"
      >
        <video
          ref={videoRef}
          className="h-full w-full origin-center object-cover will-change-transform"
          src="/video/home-background.mp4"
          autoPlay
          loop
          playsInline
          muted={mute}
          preload="auto"
        />
      </Container>
      <NatureSound volume={0.4} mute={mute} play={true} url="Q48Fry14PDM" />
      <div className="h-full w-full overflow-hidden absolute top-0 bg-black opacity-30"></div>
      <Container
        width="screen"
        height="screen"
        overflow="hidden"
        position="absolute"
        className="bg-transparent top-0"
      >
        <Flex
          ref={contentRef}
          width="full"
          height="full"
          justify="center"
          align="center"
          className="opacity-0"
        >
          <Container width="fit" height="fit">
            <Flex
              ref={titleRef}
              justify="start"
              align="center"
              className="mt-5 opacity-0"
            >
              <p
                className="text-5xl lg:text-7xl text-white text-center"
                style={{ fontFamily: "Barlow Condensed" }}
              >
                MY SIMPLE RADIO
              </p>
              <div>
                <img
                  onClick={unMute}
                  className="w-10 h-10 lg:w-16 lg:h-16 ml-5 cursor-pointer hover:scale-110 active:scale-[1.6] transition-transform duration-200 ease-in-out"
                  src="/image/headphone.svg"
                  alt="HeadphoneIcon"
                ></img>
              </div>
            </Flex>
            <Section
              ref={ctaRef}
              width="fit"
              height="fit"
              centered
              className="bg-transparent mt-12 opacity-0"
            >
              <button
                onClick={openHomepageTab}
                className="px-20 py-5 text-lg bg-transparent hover:scale-110 border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out text-white rounded-full"
              >
                START LISTENING
              </button>
            </Section>
          </Container>
        </Flex>
      </Container>
    </Container>
  );
}
