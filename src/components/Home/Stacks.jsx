"use client";

import { useEffect, useState } from "react";
import SILoader from "../SILoader";

import stackListJSON from "@/app/api/profile/stackList.json";

const Stacks = () => {
  const [stackList, setStackList] = useState(stackListJSON);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const profileJSON = await response.json();
          setStackList(profileJSON.data.stacks);
        }
      } catch (err) {
        console.error(err.message || err);
      }
    })();

    return () => {};
  }, []);

  return (
    <section className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-evenly tw-bg-gradient-primary-2 tw-p-6 sm:tw-p-12 lg:tw-p-24">
      <div className="tw-my-8 tw-w-full tw-border-b-2 tw-border-b-primary-200">
        <h3 className="tw-text-2xl tw-font-extrabold tw-uppercase tw-tracking-widest">
          Stacks
        </h3>
      </div>
      <ul className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-space-x-6">
        {stackList?.length > 0 &&
          stackList.map((stackData, idx) => {
            return (
              <li
                key={idx}
                className="tags tw-mb-4 tw-flex tw-w-max tw-items-center tw-rounded-lg tw-border-2 tw-border-primary-50 tw-bg-primary-800/50 tw-px-4 tw-pb-2.5 tw-pt-3 tw-uppercase tw-leading-none tw-text-primary-50 tw-transition"
              >
                <SILoader iconName={stackData.stackIconName} />
                {stackData.stackName}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Stacks;
