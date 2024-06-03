"use client";

import { useEffect } from "react";

const MouseLight = () => {
  const followMouse = (ev) => {
    const mouseLightEl = document.getElementsByClassName("cursor-ball")[0];
    mouseLightEl.style.top = ev.clientY + "px";
    mouseLightEl.style.left = ev.clientX + "px";
  };

  useEffect(() => {
    document.addEventListener("mousemove", followMouse);

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  }, []);

  return (
    <div className="tw-pointer-events-none tw-fixed tw-z-[1] tw-h-full tw-w-full">
      <span className="cursor-ball tw-pointer-events-none tw-absolute tw-z-[1] tw-h-12 tw-w-12 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-bg-primary-700/50 tw-blur-2xl tw-transition"></span>
    </div>
  );
};

export default MouseLight;
