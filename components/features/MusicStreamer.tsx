"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/Gsap";
import {
  consumePageTransition,
  markPageTransition,
} from "@/lib/pageTransition";
import Particles from "@/components/ui/Particles";
import VideoPlayer from "@/components/features/VideoPlayer";
import TopNavigation from "@/components/features/TopNav";
import NatureSound from "@/components/features/NatureSound";
import ChannelMarquee from "@/components/features/player/ChannelMarquee";
import StationList from "@/components/features/player/StationList";
import ControlDock from "@/components/features/player/ControlDock";
import type { ChannelModel } from "@/models/MainModel";
import useParticleField from "@/hooks/useParticleField";
import listRadio from "@/RadioList.json";

registerGSAP();

const CHANNELS = listRadio as ChannelModel[];

const DEFAULT_CHANNEL: ChannelModel = CHANNELS[0] ?? {
  channel: "Lofi Girl – Relax/Study",
  urlPart: "rFZHOHl-L8A",
  url: "https://www.youtube.com/watch?v=rFZHOHl-L8A",
};

export default function MusicStreamer() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const channelRef = useRef(DEFAULT_CHANNEL);
  const switchToken = useRef(0);
  const leavingRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [rain, setRain] = useState(0);
  const [waves, setWaves] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [fromHome, setFromHome] = useState<boolean | null>(null);
  const [channel, setChannel] = useState<ChannelModel>(DEFAULT_CHANNEL);
  const [particles] = useState<ReactElement>(() => <Particles />);
  const particlesOn = useParticleField();

  useLayoutEffect(() => {
    const handoff = consumePageTransition("player");
    setFromHome(handoff);
    if (handoff) {
      gsap.set(curtainRef.current, { autoAlpha: 1 });
      gsap.set(uiRef.current, { autoAlpha: 0 });
    }
  }, []);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useGSAP(
    () => {
      if (fromHome === null) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(curtainRef.current, { autoAlpha: 0 });
        gsap.set(uiRef.current, { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(curtainRef.current, { autoAlpha: 1, yPercent: 0 });
        gsap.set(uiRef.current, { autoAlpha: 0, y: fromHome ? 18 : 12 });

        const enter = gsap.timeline({ defaults: { ease: "power2.out" } });
        enter.to(
          curtainRef.current,
          {
            autoAlpha: 0,
            duration: fromHome ? 0.75 : 0.9,
            delay: fromHome ? 0 : 0.12,
          },
          0
        );
        enter.to(
          uiRef.current,
          { autoAlpha: 1, y: 0, duration: fromHome ? 0.7 : 0.8 },
          fromHome ? 0.18 : 0.28
        );
      });
    },
    { dependencies: [fromHome], scope: rootRef }
  );

  useEffect(() => {
    channelRef.current = channel;
  }, [channel]);

  const selectChannel = (next: ChannelModel) => {
    if (next.urlPart === channelRef.current.urlPart) return;

    const token = ++switchToken.current;
    const nodes = [titleRef.current, playing ? musicRef.current : null].filter(
      (node): node is HTMLParagraphElement | HTMLDivElement => node !== null
    );
    const apply = () => {
      if (switchToken.current !== token) return;
      channelRef.current = next;
      setChannel(next);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || nodes.length === 0) {
      gsap.set(nodes, { opacity: 1 });
      apply();
      return;
    }

    gsap.killTweensOf(nodes);
    gsap.to(nodes, {
      opacity: 0,
      duration: 0.35,
      ease: "power1.inOut",
      onComplete: () => {
        apply();
        if (switchToken.current !== token) return;
        gsap.to(nodes, { opacity: 1, duration: 0.45, ease: "power1.inOut" });
      },
    });
  };

  const stepChannel = (direction: -1 | 1) => {
    if (CHANNELS.length === 0) return;
    const currentIndex = CHANNELS.findIndex(
      (item) => item.urlPart === channelRef.current.urlPart
    );
    const index = currentIndex < 0 ? 0 : currentIndex;
    const nextIndex = (index + direction + CHANNELS.length) % CHANNELS.length;
    selectChannel(CHANNELS[nextIndex]);
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      if (volume === 0) setVolume(0.5);
      return;
    }
    setMuted(true);
  };

  const goHome = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
  };

  useGSAP(
    () => {
      if (!leaving || !curtainRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        markPageTransition("home");
        gsap.set(curtainRef.current, { autoAlpha: 1 });
        router.push("/");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        markPageTransition("home");
        router.prefetch("/");

        const leave = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            router.push("/");
          },
        });

        leave.to(
          uiRef.current,
          { autoAlpha: 0, y: -14, duration: 0.4, ease: "power2.in" },
          0
        );
        leave.to(curtainRef.current, { autoAlpha: 1, duration: 0.55 }, 0.12);
      });
    },
    { dependencies: [leaving, router], scope: rootRef }
  );

  return (
    <div ref={rootRef} className="player-root">
      <div ref={curtainRef} className="player-curtain" />
      <div className="player-media" inert>
        <div ref={musicRef} className="player-music">
          <VideoPlayer
            className="react-player"
            height="100%"
            width="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            urlPart={channel.urlPart}
          />
        </div>
        <NatureSound
          volume={rain}
          mute={muted}
          play={rain > 0}
          url="Q48Fry14PDM"
        />
        <NatureSound
          volume={waves}
          mute={muted}
          play={waves > 0}
          url="nZfnoaHqFZw"
        />
      </div>
      <div className="player-brightness" style={{ opacity: brightness }} />
      <div className="player-scrim" />
      {particlesOn && (
        <div
          className="player-particles"
          aria-hidden="true"
          style={{ opacity: playing ? 0 : 1, visibility: playing ? "hidden" : "visible" }}
        >
          {particles}
        </div>
      )}
      <div ref={uiRef} className="player-ui">
        <TopNavigation
          ref={titleRef}
          channel={channel.channel}
          channelUrl={channel.url}
          onBack={goHome}
        />
        <div className="player-center">
          <ChannelMarquee playing={playing} />
        </div>
        <StationList currentUrlPart={channel.urlPart} onSelect={selectChannel} />
        <ControlDock
          playing={playing}
          muted={muted}
          volume={volume}
          rain={rain}
          waves={waves}
          brightness={brightness}
          onPrevious={() => stepChannel(-1)}
          onNext={() => stepChannel(1)}
          onTogglePlay={() => setPlaying((next) => !next)}
          onToggleMute={toggleMute}
          onVolume={(next) => {
            setVolume(next);
            setMuted(next === 0);
          }}
          onRain={setRain}
          onWaves={setWaves}
          onBrightness={setBrightness}
        />
      </div>
    </div>
  );
}
