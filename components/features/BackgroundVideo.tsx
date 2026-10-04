"use client";

import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Container from "@/components/layout/Container";

type BackgroundVideoProps = {
  height: string;
  width: string;
  play: boolean;
  backgroundURL: string;
  screen?: boolean;
};

export const BackgroundVideo = ({
  height,
  width,
  play,
  backgroundURL,
}: BackgroundVideoProps) => {
  const refBackground = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refBackground.current?.classList.remove("hidden");
  }, [backgroundURL]);

  return (
    <Container
      ref={refBackground}
      width="full"
      height="full"
      overflow="hidden"
      position="absolute"
      display="hidden"
      className="top-0 z-10 scale-150"
    >
      <ReactPlayer
        className="react-player"
        src={
          backgroundURL
            ? `https://www.youtube.com/watch?v=${backgroundURL}`
            : undefined
        }
        width={width}
        height={height}
        controls={false}
        playing={play}
        loop={true}
        muted={true}
      />
    </Container>
  );
};
