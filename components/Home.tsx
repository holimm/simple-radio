"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import NatureSound from "@/components/natureSound";

registerGSAP();

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [tabTransition, setTabTransition] = useState<boolean>(false);

  const unMute = () => {
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
      setVolume(0);
    }
  };

  const openHomepageTab = () => {
    setTabTransition(true);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([contentRef.current, titleRef.current, ctaRef.current], {
          opacity: 1,
          letterSpacing: "3px",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline();
        intro.fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: "none" },
          0
        );
        intro.fromTo(
          titleRef.current,
          { opacity: 0, letterSpacing: "13px" },
          { opacity: 1, letterSpacing: "3px", duration: 4, ease: "none" },
          0
        );
        intro.fromTo(
          ctaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 5, ease: "none" },
          0
        );
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!tabTransition || !overlayRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(overlayRef.current, { y: 0 });
        router.push("/MusicStreamer");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          overlayRef.current,
          { y: "-100vh" },
          {
            y: 0,
            duration: 1,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.delayedCall(0.2, () => router.push("/MusicStreamer"));
            },
          }
        );
      });
    },
    { dependencies: [tabTransition, router], scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {tabTransition && (
        <div
          ref={overlayRef}
          className="h-screen w-screen bg-black absolute z-50"
        ></div>
      )}
      <div className="h-full w-full overflow-hidden absolute top-0 scale-[6] md:scale-[2] lg:scale-150">
        <ReactPlayer
          className="react-player"
          src={`https://www.youtube.com/watch?v=2fCoOx9W4NQ`}
          width={"100%"}
          height={"100vh"}
          playing={true}
          loop={true}
          volume={volume}
          muted={mute}
        />
      </div>
      <NatureSound volume={0.4} mute={mute} play={true} url="Q48Fry14PDM" />
      <div className="h-full w-full overflow-hidden absolute top-0 bg-black opacity-30"></div>
      <div className="h-screen w-screen bg-transparent overflow-hidden absolute top-0">
        <div
          ref={contentRef}
          className="h-full w-full flex justify-center items-center opacity-0"
        >
          <div className="h-fit w-fit">
            <div
              ref={titleRef}
              className="flex justify-start items-center mt-5 opacity-0"
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
                  className="w-10 h-10 lg:w-16 lg:h-16 ml-5 cursor-pointer active:scale-[1.6] transition-transform duration-200 ease-in-out"
                  src="/image/headphone.svg"
                  alt="HeadphoneIcon"
                ></img>
              </div>
            </div>
            <div ref={ctaRef} className="bg-transparent mx-auto mt-12 w-fit h-fit opacity-0">
              <button
                onClick={openHomepageTab}
                className="px-20 py-5 text-lg bg-transparent hover:scale-110 border-2 hover:bg-white hover:text-black transition duration-300 ease-in-out text-white rounded-full"
              >
                START LISTENING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
