"use client";

import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

function ParticleCanvas() {
  return (
    <Particles
      id="tsparticles"
      options={{
        fpsLimit: 60,
        particles: {
          color: {
            value: "#ffffff",
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            random: false,
            speed: 0.3,
            straight: true,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function Particle() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <ParticleCanvas />
    </ParticlesProvider>
  );
}
