"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import Particle from "@/particles/particles";
import VideoPlayer from "@/components/videoPlayer";
import TopNavigation from "@/components/topNav";
import ChannelPicker from "@/components/channelPicker";
import PausedScreen from "@/components/pausedScreen";
import BrightnessChanger from "@/components/brightnessChanger";
import NatureSound from "@/components/natureSound";
import {
  BackgroundVideo,
  BackgroundControlsMobile,
} from "@/components/backgroundVideo";
import {
  BottomControls,
  BottomControlsMobile,
} from "@/components/bottomControls";
import { BackgroundPlayerModel, ChannelModel } from "@/models/mainModel";
import useWindowDimensions from "@/hooks/useDimensions";

registerGSAP();

export default function MusicStreamer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const particlesWrapRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState<boolean>(true);
  const [play, setPlay] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);
  const [playRain, setPlayRain] = useState<boolean>(false);
  const [volumeRain, setVolumeRain] = useState<number>(0);
  const [playWave, setPlayWave] = useState<boolean>(false);
  const [volumeWave, setVolumeWave] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [genre, setGenre] = useState<string>("Streaming");
  const [bgPlayer, setBGPlayer] = useState<BackgroundPlayerModel>({
    label: "BG Video",
    url: "",
  });
  const [particles] = useState(<Particle />);
  const [channel, setChannel] = useState<ChannelModel>({
    channel: "Lofi Girl - Relax/Study",
    urlPart: "jfKfPfyJRdk",
    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    type: "Streaming",
  });
  const { width } = useWindowDimensions();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(curtainRef.current, { y: "100vh", display: "none" });
        gsap.set(rightColumnRef.current, { x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const enter = gsap.timeline();
        enter.fromTo(
          curtainRef.current,
          { y: 0, display: "block" },
          {
            y: "100vh",
            duration: 1,
            delay: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(curtainRef.current, { display: "none" });
            },
          },
          0
        );
        enter.fromTo(
          rightColumnRef.current,
          { x: 150 },
          { x: 0, duration: 1.7, delay: 0.8, ease: "power1.inOut" },
          0
        );
      });
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (play || !particlesWrapRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(particlesWrapRef.current, { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          particlesWrapRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power1.inOut" }
        );
      });
    },
    { dependencies: [play], scope: rootRef }
  );

  const changeMute = () => {
    setMute(!mute);
  };
  const playMusic = () => {
    setPlay(!play);
  };
  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value) / 100;
    if (nextVolume !== 0) {
      setVolume(nextVolume);
      setMute(false);
    } else {
      setVolume(nextVolume);
      setMute(true);
    }
  };
  const handleRainVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value) / 100;
    setPlayRain(nextVolume !== 0);
    setVolumeRain(nextVolume);
  };
  const handleWaveVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value) / 100;
    setPlayWave(nextVolume !== 0);
    setVolumeWave(nextVolume);
  };
  const handleBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextBrightness = Number(e.target.value) / 100;
    setBrightness(nextBrightness);
  };
  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value === 0) setGenre("Streaming");
    else if (value === 1) setGenre("Lofi");
    else if (value === 2) setGenre("Piano");
    else if (value === 3) setGenre("Electric Guitar");
    else if (value === 4) setGenre("Creator's Choice");
    else setGenre("Streaming");
  };
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value) {
      case "0": {
        setBGPlayer({ label: "Video BG", url: "" });
        break;
      }
      case "1": {
        setBGPlayer({ label: "Autumn", url: "2wIACHP04qQ" });
        break;
      }
      case "2": {
        setBGPlayer({ label: "Summer Tram", url: "KextmYQmxH0" });
        break;
      }
      case "3": {
        setBGPlayer({ label: "Rain", url: "kDCXBwzSI-4" });
        break;
      }
      case "4": {
        setBGPlayer({ label: "Living Room", url: "zJOQRLJyQYA" });
        break;
      }
    }
  };
  function changeChannel(nextChannel: ChannelModel) {
    setChannel(nextChannel);
  }

  return (
    <div ref={rootRef}>
      <div
        ref={curtainRef}
        className="h-screen w-screen bg-black absolute z-50"
      ></div>
      {width < 768 && (
        <div className="h-[50vh] w-screen bg-black absolute bottom-0 z-20"></div>
      )}
      <NatureSound
        volume={volumeRain}
        mute={mute}
        play={playRain}
        url="Q48Fry14PDM"
      />
      <NatureSound
        volume={volumeWave}
        mute={mute}
        play={playWave}
        url="nZfnoaHqFZw"
      />
      <div className="h-full w-full overflow-hidden absolute top-0 z-10 md:scale-[1.8] scale-[1.4]">
        <VideoPlayer
          className={"react-player"}
          height={width < 768 ? "50vh" : "100vh"}
          width={"100%"}
          playing={play}
          volume={volume}
          muted={mute}
          urlPart={channel.urlPart}
        />
      </div>

      <BackgroundVideo
        height={width < 768 ? "50vh" : "100vh"}
        width={"100%"}
        play={play}
        backgroundURL={bgPlayer.url}
        screen
      />

      <div
        className={`h-full w-full overflow-hidden absolute top-0 z-10 bg-black`}
        style={{ opacity: brightness }}
      ></div>

      {!play && (
        <div ref={particlesWrapRef} className="absolute top-0 z-30 opacity-0">
          {particles}
        </div>
      )}
      <div className="h-screen w-screen bg-transparent overflow-hidden absolute top-0 z-30">
        <TopNavigation channel={channel.channel} url={channel.url} />
        <div className="h-[27vh] w-full block md:hidden"></div>
        <div className="h-[29vh] w-full md:h-[70%]">
          <ChannelPicker
            genre={genre}
            handleGenreChange={handleGenreChange}
            changeChannel={changeChannel}
          />
          {!play && <PausedScreen />}
          <div ref={rightColumnRef} className="w-3/12 h-full float-right">
            <div className="w-full h-full md:flex justify-end items-center relative">
              <BrightnessChanger handleBrightness={handleBrightness} />
              <BottomControlsMobile
                handleVolume={handleRainVolume}
                icon="/image/icon/rain.svg"
              />
              <BottomControlsMobile
                handleVolume={handleWaveVolume}
                icon="/image/icon/wave.svg"
              />
              <BackgroundControlsMobile
                handleVolume={handleBackgroundChange}
                icon="/image/icon/image.svg"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full p-5 pb-10 mt-8 md:mt-0">
          <BottomControls
            handleChangeVolume={handleChangeVolume}
            handleRainVolume={handleRainVolume}
            handleWaveVolume={handleWaveVolume}
            handleBackgroundChange={handleBackgroundChange}
            changeMute={changeMute}
            playMusic={playMusic}
            play={play}
            mute={mute}
            backgroundLabel={bgPlayer.label}
            screenWidth={width}
          />
        </div>
      </div>
    </div>
  );
}
