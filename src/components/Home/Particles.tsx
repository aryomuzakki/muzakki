"use client";

import { Particle } from "jparticles";
import { useEffect, useRef, useState } from "react";

const Particles = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const particleOpts = {
      minR: 1,
      maxR: 3,
      range: 150,
      proximity: 100,
      parallax: true,
      parallaxLayer: [12, 26, 32, 38],
      minSpeed: 0.02,
      maxSpeed: 0.5,
    };

    const theParticles = new Particle(".interactive-particles", particleOpts);
    particlesRef.current = theParticles;

    theParticles.onDestroy(() => {
      console.log("Particles canvas destroyed");
      particlesRef.current = null;
    });

    return () => {
      const el = document.querySelector(".interactive-particles canvas");
      el?.remove();
    };
  }, []);

  return (
    <>
      <div className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-overflow-hidden">
        <div className="interactive-particles tw-absolute tw-left-[-10%] tw-top-[-10%] tw-h-[120%] tw-w-[120%]"></div>
      </div>
      <div className="tw-absolute tw-bottom-8 tw-left-8 tw-z-[1] tw-flex tw-gap-4 tw-text-sm tw-font-extralight tw-text-primary-200 tw-opacity-50">
        <button
          className="hover:tw-text-primary-400"
          onClick={() => {
            particlesRef.current?.open();
          }}
        >
          Play
        </button>
        <button
          className="hover:tw-text-primary-400"
          onClick={() => {
            particlesRef.current?.pause();
          }}
        >
          Pause
        </button>
      </div>
    </>
  );
};

export default Particles;
