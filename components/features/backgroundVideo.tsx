"use client";

import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import RangeInput from "@/components/ui/rangeInput";

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
    <div
      ref={refBackground}
      className="h-full w-full overflow-hidden absolute top-0 z-10 scale-150 hidden"
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
    </div>
  );
};

type BackgroundControlsMobileProps = {
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
};

export const BackgroundControlsMobile = ({
  handleVolume,
  icon,
}: BackgroundControlsMobileProps) => {
  return (
    <div className="h-14 w-full relative md:hidden">
      <div className="h-full w-full flex justify-end items-center ">
        <div className="h-fit w-fit md:-rotate-90 float-right">
          <RangeInput
            onChange={handleVolume}
            max={4}
            className="w-[6rem] md:w-[10rem] mr-5 md:mr-0"
          />
        </div>
        <div className="h-fit w-fit text-white text-center float-right absolute right-[8rem] md:right-[6rem]">
          <img className="w-8 h-8" src={icon} alt="BrightnessIcon"></img>
        </div>
      </div>
    </div>
  );
};
