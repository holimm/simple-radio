"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";

registerGSAP();

type BottomControlsProps = {
  handleChangeVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRainVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleWaveVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeMute: () => void;
  playMusic: () => void;
  play: boolean;
  mute: boolean;
  backgroundLabel: string;
  screenWidth: number;
};

type NatureSoundControlsProps = {
  src: string;
  alt: string;
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  screenWidth: number;
};

export const BottomControls = ({
  handleChangeVolume,
  handleRainVolume,
  handleWaveVolume,
  handleBackgroundChange,
  changeMute,
  playMusic,
  play,
  mute,
  backgroundLabel,
  screenWidth,
}: BottomControlsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const natureRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [natureRef.current, controlsRef.current, backgroundRef.current],
          { y: 0 }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const enter = gsap.timeline({ delay: 0.8 });
        enter.fromTo(
          natureRef.current,
          { y: 150 },
          { y: 0, duration: 2, ease: "power1.inOut" },
          0
        );
        enter.fromTo(
          controlsRef.current,
          { y: 150 },
          { y: 0, duration: 1.6, ease: "power1.inOut" },
          0
        );
        enter.fromTo(
          backgroundRef.current,
          { y: 150 },
          { y: 0, duration: 2, ease: "power1.inOut" },
          0
        );
      });
    },
    { scope: rootRef }
  );

  const renderNatureSoundControls = ({
    src,
    alt,
    handleVolume,
    screenWidth: width,
  }: NatureSoundControlsProps) => {
    return (
      <div
        className={`h-fit w-fit float-left mx-3 ${
          width < 1280 && "flex justify-center items-center"
        }`}
      >
        <img className={`w-8 h-8 mr-5 xl:mx-auto`} src={src} alt={alt}></img>
        <input
          type={"range"}
          onChange={handleVolume}
          className="w-[2rem] md:w-[8rem] appearance-none rounded-xl p-0 h-1 bg-slate-100"
          min={0}
          max={100}
          defaultValue={0}
        />
      </div>
    );
  };
  return (
    <div
      ref={rootRef}
      className="w-full h-fit mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-16"
    >
      {/* Nature Sound */}
      <div className="h-full w-full hidden md:block">
        <div
          ref={natureRef}
          className="h-full w-full xl:w-[75%] flex justify-center items-center float-right bg-slate-400/30 backdrop-blur-xl rounded-full"
        >
          <div className="mx-auto w-fit grid lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {renderNatureSoundControls({
              src: "/image/icon/rain.svg",
              alt: "RainIcon",
              handleVolume: handleRainVolume,
              screenWidth,
            })}
            {renderNatureSoundControls({
              src: "/image/icon/wave.svg",
              alt: "WaveIcon",
              handleVolume: handleWaveVolume,
              screenWidth,
            })}
          </div>
        </div>
      </div>
      {/* Nature Sound */}
      {/* Controls */}
      <div className="h-full w-full">
        <div
          ref={controlsRef}
          className="h-full w-full md:w-full xl:w-[80%] flex justify-center items-center px-5 py-3 mx-auto bg-slate-400/30 backdrop-blur-xl rounded-full"
        >
          <div className="h-full w-full flex justify-center items-center">
            <div className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-[0.8]">
              <button
                onClick={playMusic}
                className="h-16 w-16 lg:h-20 lg:w-20 text-lg bg-transparent border-2 transition duration-300 ease-in-out text-white rounded-full"
              >
                <img
                  className="h-12 w-12 mx-auto"
                  src={play ? "/image/icon/pause.svg" : "/image/icon/play.svg"}
                  alt="PlayIcon"
                />
              </button>
            </div>
            <div className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-[0.8]">
              <button
                onClick={changeMute}
                className="h-16 w-16 lg:h-20 lg:w-20 mx-6 lg:mx-5 text-lg bg-transparent border-2 hover:scale-110 transition duration-300 ease-in-out text-white rounded-full"
              >
                <img
                  className="h-12 w-12 mx-auto"
                  src={
                    mute
                      ? "/image/icon/volumeoff.svg"
                      : "/image/icon/volumeon.svg"
                  }
                  alt="VolumeIcon"
                />
              </button>
            </div>
            <input
              type={"range"}
              onChange={handleChangeVolume}
              className={`w-[7rem] md:w-[5rem] lg:w-[7rem] xl:w-[8rem] appearance-none rounded-xl p-0 h-1 ml-1 md:ml-0 bg-slate-100`}
              min={0}
              max={100}
              defaultValue={0}
            />
          </div>
        </div>
      </div>
      {/* Controls */}
      {/* BG Changer */}
      <div className="h-full w-full hidden md:block">
        <div
          ref={backgroundRef}
          className="h-full w-full xl:w-[75%] lg:flex justify-between items-center bg-slate-400/30 backdrop-blur-xl rounded-full "
        >
          <div className="flex justify-center items-center py-4 mx-auto w-fit h-full text-white after:bg-rose-500 appearance-none focus:ring-0 cursor-pointer">
            <div className="w-fit">
              <p
                className="text-center text-white text-2xl"
                style={{ fontFamily: "Barlow Condensed" }}
              >
                {backgroundLabel}
              </p>
              <input
                type={"range"}
                onChange={handleBackgroundChange}
                className="appearance-none rounded-xl p-0 h-1 bg-slate-100"
                min={0}
                max={4}
                defaultValue={0}
              />
            </div>
          </div>
        </div>
      </div>
      {/* BG Changer */}
    </div>
  );
};

type BottomControlsMobileProps = {
  handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
};

export const BottomControlsMobile = ({
  handleVolume,
  icon,
}: BottomControlsMobileProps) => {
  return (
    <div className="h-14 w-full relative md:hidden">
      <div className="h-full w-full flex justify-end items-center ">
        <div className="h-fit w-fit md:-rotate-90 float-right">
          <input
            type={"range"}
            onChange={handleVolume}
            className="appearance-none rounded-xl p-0 h-1 bg-slate-100 w-[6rem] md:w-[10rem] mr-5 md:mr-0"
            min={0}
            max={100}
            defaultValue={0}
          />
        </div>
        <div className="h-fit w-fit text-white text-center float-right absolute right-[8rem] md:right-[6rem]">
          <img className="w-8 h-8" src={icon} alt="BrightnessIcon"></img>
        </div>
      </div>
    </div>
  );
};
