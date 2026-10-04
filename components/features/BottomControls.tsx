"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import RangeInput from "@/components/ui/RangeInput";
import IconButton from "@/components/ui/IconButton";
import NatureSoundControls from "@/components/ui/NatureSoundControls";
import Container from "@/components/layout/Container";
import Flex from "@/components/layout/Flex";
import Grid from "@/components/layout/Grid";

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

  return (
    <Grid
      ref={rootRef}
      width="full"
      height="fit"
      cols={1}
      gap={2}
      centered
      className="md:grid-cols-3 lg:gap-16"
    >
      {/* Nature Sound */}
      <Container width="full" height="full" className="hidden md:block">
        <Flex
          ref={natureRef}
          width="full"
          height="full"
          justify="center"
          align="center"
          className="xl:w-[75%] float-right bg-slate-400/30 backdrop-blur-xl rounded-full"
        >
          <Grid width="fit" gap={6} centered className="lg:grid-cols-1 xl:grid-cols-2">
            <NatureSoundControls
              src="/image/icon/rain.svg"
              alt="RainIcon"
              handleVolume={handleRainVolume}
              screenWidth={screenWidth}
            />
            <NatureSoundControls
              src="/image/icon/wave.svg"
              alt="WaveIcon"
              handleVolume={handleWaveVolume}
              screenWidth={screenWidth}
            />
          </Grid>
        </Flex>
      </Container>
      {/* Nature Sound */}
      {/* Controls */}
      <Container width="full" height="full">
        <Flex
          ref={controlsRef}
          width="full"
          height="full"
          justify="center"
          align="center"
          centered
          className="md:w-full xl:w-[80%] px-5 py-3 bg-slate-400/30 backdrop-blur-xl rounded-full"
        >
          <Flex width="full" height="full" justify="center" align="center">
            <div className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-[0.8]">
              <IconButton
                size="lg"
                onClick={playMusic}
                src={play ? "/image/icon/pause.svg" : "/image/icon/play.svg"}
                alt="PlayIcon"
              />
            </div>
            <div className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-[0.8]">
              <IconButton
                size="lg"
                onClick={changeMute}
                src={
                  mute ? "/image/icon/volumeoff.svg" : "/image/icon/volumeon.svg"
                }
                alt="VolumeIcon"
                className="mx-6 lg:mx-5 hover:scale-110"
              />
            </div>
            <RangeInput
              onChange={handleChangeVolume}
              className="w-[7rem] md:w-[5rem] lg:w-[7rem] xl:w-[8rem] ml-1 md:ml-0"
            />
          </Flex>
        </Flex>
      </Container>
      {/* Controls */}
      {/* BG Changer */}
      <Container width="full" height="full" className="hidden md:block">
        <Container
          ref={backgroundRef}
          width="full"
          height="full"
          className="xl:w-[75%] lg:flex justify-between items-center bg-slate-400/30 backdrop-blur-xl rounded-full "
        >
          <Flex
            width="fit"
            height="full"
            justify="center"
            align="center"
            centered
            className="py-4 text-white after:bg-rose-500 appearance-none focus:ring-0 cursor-pointer"
          >
            <Container width="fit">
              <p
                className="text-center text-white text-2xl"
                style={{ fontFamily: "Barlow Condensed" }}
              >
                {backgroundLabel}
              </p>
              <RangeInput onChange={handleBackgroundChange} max={4} />
            </Container>
          </Flex>
        </Container>
      </Container>
      {/* BG Changer */}
    </Grid>
  );
};
