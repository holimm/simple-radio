"use client";

import TsParticles from "@tsparticles/react";

const ParticleCanvas = () => {
  return (
    <TsParticles
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
};

export default ParticleCanvas;
