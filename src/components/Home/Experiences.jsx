"use client";

import { useEffect, useState } from "react";
import SVGLoader from "../SILoader";

import experienceListJSON from "@/app/api/profile/experienceList.json";

const Experiences = () => {
  const [experienceList, setExperienceList] = useState(experienceListJSON);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const profileJSON = await response.json();
          setExperienceList(profileJSON.data.experiences);
        }
      } catch (err) {
        console.error(err.message || err);
      }
    })();

    return () => {};
  }, []);
  return (
    <section className="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-evenly tw-bg-gradient-primary tw-p-6 sm:tw-p-12 lg:tw-p-24">
      <div className="tw-my-8 tw-w-full tw-border-b-2 tw-border-b-primary-200">
        <h3 className="tw-text-2xl tw-font-extrabold tw-uppercase tw-tracking-widest">
          Experiences
        </h3>
      </div>
      <ul className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-space-x-6">
        <ul className="tw-du-timeline tw-du-timeline-vertical tw-du-timeline-snap-icon max-md:tw-du-timeline-compact">
          {experienceList?.length > 0 &&
            experienceList.map((expData, idx) => {
              return (
                <li key={idx}>
                  {idx !== 0 && (
                    <hr className="-tw-translate-y-1.5 tw-bg-primary-300" />
                  )}
                  <div className="tw-du-timeline-middle ">
                    {/* prettier-ignore */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tw-h-5 tw-w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg> */}
                    <div className="tw-h-7 tw-w-7 -tw-translate-y-1.5 tw-rounded-full tw-bg-primary-50 tw-p-1 tw-text-primary-800">
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-full tw-w-full" viewBox="0 0 32 32">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M30 8H2v18h28ZM20 8s0-4-4-4s-4 4-4 4M8 26V8m16 18V8"></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`${idx % 2 === 0 ? "tw-du-timeline-start md:!tw-mr-2 md:tw-text-end" : "tw-du-timeline-end"} !tw-mb-10 !tw-ml-2`}
                  >
                    <time className="tw-font-mono tw-italic">
                      {expData.time}
                    </time>
                    <h4 className="tw-text-lg tw-font-black">
                      {expData.title}
                    </h4>
                    <p className="tw-font-semibold">
                      {expData.company ? expData.company + " - " : ""}
                      <span className="tw-font-light tw-italic">
                        {expData.location}
                      </span>
                    </p>
                    <ul>
                      {expData.taskList?.length > 0 &&
                        expData.taskList.map((taskData, secIdx) => {
                          return (
                            <li
                              key={secIdx}
                              className={`${idx % 2 === 0 ? "md:tw-flex-row-reverse" : ""} tw-flex`}
                            >
                              {/* prettier-ignore */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tw-flex-shrink-0 tw-h-5 tw-w-5 tw-translate-y-0.5 tw-mx-1"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                              {taskData}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <hr className="-tw-translate-y-1.5 tw-bg-primary-300" />
                </li>
              );
            })}
        </ul>
      </ul>
    </section>
  );
};

export default Experiences;
