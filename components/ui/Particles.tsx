"use client";

import { useCallback } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import ParticleCanvas from "@/components/ui/ParticleCanvas";

export default function Particles() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <ParticleCanvas />
    </ParticlesProvider>
  );
}
