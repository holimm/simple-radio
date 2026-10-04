"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import IconButton from "@/components/ui/IconButton";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";

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
    <Flex
      ref={navRef}
      width="full"
      justify="start"
      align="center"
      className="h-20 opacity-0"
    >
      <Flex
        width="full"
        height="full"
        justify="start"
        align="center"
        className="md:w-[40%] lg:w-1/3"
      >
        <Link href="/">
          <IconButton
            src="/image/icon/back.svg"
            alt="ReturnIcon"
            className="mx-5 ml-0 lg:ml-20"
          />
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
          <IconButton
            src="/image/icon/github.svg"
            alt="GitHubIcon"
            className="mx-5 text-lg"
          />
        </a>
      </Flex>
      <Container
        width="6/12"
        height="full"
        className="lg:w-7/12 hidden md:block"
      >
        <Flex justify="start" align="center">
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
        </Flex>
      </Container>
    </Flex>
  );
};

export default TopNavigation;
