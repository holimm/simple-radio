"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";

registerGSAP();

const TopNavigation = ({ ...others }) => {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(navRef.current, { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          navRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 3, ease: "power1.inOut" }
        );
      });
    },
    { scope: navRef }
  );

  return (
    <div
      ref={navRef}
      className="h-20 w-full flex justify-start items-center opacity-0"
    >
      <div className="w-full md:w-[40%] lg:w-1/3 h-full flex justify-start items-center">
        <Link href="/">
          <button className="h-9 w-9 mx-5 ml-0 lg:ml-20 bg-transparent border-2 hover:scale-110 transition duration-300 ease-in-out text-white rounded-full">
            <img
              className="h-6 w-6 mx-auto"
              src="/image/icon/back.svg"
              alt="ReturnIcon"
            />
          </button>
        </Link>
        <h2
          className="text-white text-xl lg:text-3xl"
          style={{ fontFamily: "Barlow Condensed" }}
        >
          My Simple Radio
        </h2>
        <a
          href="https://github.com/holimm/MySimpleRadio"
          target={"_blank"}
          rel="noreferrer"
        >
          <button className="h-9 w-9 mx-5 text-lg bg-transparent border-2 hover:scale-110 transition duration-300 ease-in-out text-white rounded-full">
            <img
              className="h-6 w-6 mx-auto"
              src="/image/icon/github.svg"
              alt="GitHubIcon"
            />
          </button>
        </a>
      </div>
      <div className="w-6/12 lg:w-7/12 h-full hidden md:block">
        <div className="flex justify-start items-center">
          <p
            className="text-white text-2xl lg:text-6xl truncate py-2"
            style={{ fontFamily: "Barlow Condensed" }}
          >
            {others.channel}
          </p>
          <a href={`${others.url}`} target={"_blank"} rel="noreferrer">
            <img
              className="w-10 h-10 ml-4 mt-2 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
              src="/image/icon/youtube.svg"
              alt="YoutubeIcon"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
