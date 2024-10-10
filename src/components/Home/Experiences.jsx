"use client";

import { useEffect, useState } from "react";

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
    <section
      id="experiences"
      className="tw-flex tw-w-full tw-scroll-mt-8 tw-flex-col tw-items-center tw-justify-evenly tw-bg-gradient-primary tw-p-6 sm:tw-scroll-m-0 sm:tw-p-12 lg:tw-p-24"
    >
      <div
        className="tw-my-8 tw-w-full tw-border-b-2 tw-border-b-primary-200 tw-pb-2"
        data-aos="fade-up"
      >
        <h3 className="tw-text-2xl tw-font-extrabold tw-uppercase tw-tracking-widest">
          Experiences
        </h3>
      </div>
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-x-6">
        <ul className="tw-du-timeline tw-du-timeline-vertical tw-du-timeline-snap-icon tw-overflow-hidden max-md:tw-du-timeline-compact">
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
                      {expData.category === "job" ? (
                        <>
                          {/* bytesize:work */}
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="tw-h-full tw-w-full">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M30 8H2v18h28ZM20 8s0-4-4-4s-4 4-4 4M8 26V8m16 18V8"></path>
                          </svg>
                        </>
                      ) : (
                        ""
                      )}

                      {expData.category === "education" ? (
                        <>
                          {/* fluent:hat-graduation-20-regular */}
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="tw-h-full tw-w-full">
                            <path fill="currentColor" d="M8.506 3.4a3 3 0 0 1 2.988 0l7.255 4.166a.5.5 0 0 1 0 .867L16 10.01v4.49a.5.5 0 0 1-.146.354l-.002.001l-.002.003l-.007.006l-.023.022l-.08.074q-.105.095-.301.248a8 8 0 0 1-1.141.733A9.1 9.1 0 0 1 10 17a9.1 9.1 0 0 1-4.298-1.06a8 8 0 0 1-1.14-.733a6 6 0 0 1-.382-.322A.53.53 0 0 1 4 14.5v-4.488L2 8.863v4.636a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .26-.439zm2.988 9.198a3 3 0 0 1-2.988 0L5 10.585v3.691q.07.06.173.14a7 7 0 0 0 1 .642c.88.47 2.175.941 3.827.941a8.1 8.1 0 0 0 3.827-.94A7 7 0 0 0 15 14.276v-3.692zm-.498-8.33a2 2 0 0 0-1.992 0l-6.5 3.731l6.5 3.732a2 2 0 0 0 1.992 0l6.5-3.732z"></path>
                          </svg>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    className={`${idx % 2 === 0 ? "tw-du-timeline-start md:!tw-mr-2 md:tw-text-end" : "tw-du-timeline-end"} !tw-mb-10 !tw-ml-2`}
                    data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
                    data-aos-delay={50 * idx}
                    data-aos-duration="600"
                  >
                    <time className="tw-font-mono tw-italic">
                      {expData.time}
                    </time>
                    <h4 className="tw-text-lg tw-font-black">
                      {expData.title}
                    </h4>
                    <p className="tw-font-bold">
                      {expData.institution ? expData.institution + " - " : ""}
                      <span className="tw-font-light tw-italic">
                        {expData.location}
                      </span>
                    </p>
                    {expData.brief ? <p className="">{expData.brief}</p> : ""}
                    <ul>
                      {expData.briefList?.length > 0 &&
                        expData.briefList.map((briefListData, secIdx) => {
                          return (
                            <li
                              key={secIdx}
                              className={`${idx % 2 === 0 ? "md:tw-flex-row-reverse" : ""} tw-flex`}
                            >
                              {/*  */}
                              {/* prettier-ignore */}
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tw-flex-shrink-0 tw-h-5 tw-w-5 tw-translate-y-0.5 tw-mx-1">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg> */}
                              {/* heroicons:check-circle-20-solid */}
                              {/* prettier-ignore */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tw-flex-shrink-0 tw-h-5 tw-w-5 tw-translate-y-0.5 tw-mx-1">
                                <path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79l-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089z" clipRule="evenodd"></path>
                              </svg>
                              {briefListData}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <hr className="-tw-translate-y-1.5 tw-bg-primary-300" />
                </li>
              );
            })}
          <li>
            <hr className="-tw-translate-y-1.5 tw-bg-primary-300" />
            {/* <div className="tw-du-timeline-start"></div> */}
            <div className="tw-du-timeline-middle">
              <div className="tw-h-5 tw-w-5 -tw-translate-y-3 tw-rounded-full tw-bg-primary-50 tw-p-1"></div>
              {/* prettier-ignore */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="tw-w-5 tw-h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg> */}
            </div>
            {/* <div className="tw-du-timeline-end tw-du-timeline-box">Apple Watch</div> */}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Experiences;
