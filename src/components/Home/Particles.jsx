"use client";

import { Particle } from "jparticles";
import { useEffect, useState } from "react";

const Particles = () => {
  const [interactiveParticles, setInteractiveParticles] = useState();

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const particleOpts = {
        lineShape: "star:5:0.5",
        minR: 1,
        maxR: 3,
        range: 150,
        proximity: 100,
        parallax: true,
        parallaxLayer: [4, 8, 10, 11],
        minSpeed: 0.05,
        maxSpeed: 1,
      };

      const theParticles = new Particle(".interactive-particles", particleOpts);

      setInteractiveParticles(theParticles);
    }

    return () => {};
  }, []);

  return (
    <>
      <div className="interactive-particles tw-absolute tw-inset-0 tw-h-full tw-w-full"></div>
      <div className="tw-absolute tw-bottom-8 tw-left-8 tw-z-[1] tw-flex tw-gap-4 tw-text-sm tw-font-extralight tw-text-primary-200 tw-opacity-50">
        <button
          className="hover:tw-text-primary-400"
          onClick={() => {
            interactiveParticles.open();
          }}
        >
          Play
        </button>
        <button
          className="hover:tw-text-primary-400"
          onClick={() => {
            interactiveParticles.pause();
          }}
        >
          Pause
        </button>
      </div>
    </>
  );
};

export default Particles;
