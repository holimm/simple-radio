"use client";

import TsParticles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const PARTICLE_OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  detectRetina: false,
  particles: {
    color: { value: "#ffffff" },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      random: false,
      speed: 0.2,
      straight: true,
    },
    number: {
      value: 36,
    },
    opacity: { value: 0.35 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      resize: { enable: true },
    },
  },
};

const ParticleCanvas = () => {
  return <TsParticles id="tsparticles" options={PARTICLE_OPTIONS} />;
};

export default ParticleCanvas;
