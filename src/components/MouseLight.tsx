"use client";

import { useEffect, useRef } from "react";

const MouseLight = () => {
  const lightRef = useRef<HTMLSpanElement | null>(null);

  const followMouse = (ev: MouseEvent) => {
    const el = lightRef.current;
    if (!el) return;
    el.style.top = `${ev.clientY}px`;
    el.style.left = `${ev.clientX}px`;
  };

  useEffect(() => {
    document.addEventListener("mousemove", followMouse);
    return () => document.removeEventListener("mousemove", followMouse);
  }, []);

  return (
    <div className="tw-pointer-events-none tw-fixed tw-z-[1] tw-h-full tw-w-full">
      <span
        ref={lightRef}
        className="cursor-ball tw-pointer-events-none tw-absolute tw-z-[1] tw-h-12 tw-w-12 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-bg-primary-700/50 tw-blur-2xl tw-transition"
      />
    </div>
  );
};

export default MouseLight;
