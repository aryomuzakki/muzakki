"use client";

import "aos/dist/aos.css"
import AOS from "aos";
import { useEffect } from "react";

const AOSWrapper = () => {
  useEffect(() => {
    AOS.init();

    return () => {};
  }, []);

  return <></>;
};

export default AOSWrapper;
