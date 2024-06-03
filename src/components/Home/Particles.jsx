"use client";

import { Particle } from "jparticles";
import { useEffect } from "react";

const Particles = () => {
  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const particleOpts = {
        lineShape: 'star:5:0.5',
        minR: 1,
        maxR: 3,
        range: 150,
        proximity: 100,
        parallax: true,
        parallaxLayer: [4, 8, 10, 11],
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
