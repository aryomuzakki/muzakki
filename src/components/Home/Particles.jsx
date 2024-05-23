"use client";

import { Particle } from "jparticles";
import { useEffect } from "react";

const Particles = () => {
  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const particleOpts = {
        // lineShape: 'cube',
        range: 100,
        proximity: 100,
        parallax: true,
        parallaxLayer: [4, 8, 10],
        minSpeed: 0.05,
        maxSpeed: 1,
      };

      const interactiveParticles = new Particle(
        ".interactive-particles",
        particleOpts,
      );
    }

    return () => {};
  }, []);

  return (
    <div className="interactive-particles tw-absolute tw-inset-0 tw-h-full tw-w-full"></div>
  );
};

export default Particles;
