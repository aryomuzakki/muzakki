"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import projectListJSON from "@/app/api/profile/projectList.json";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Link from "next/link";

const Projects = () => {
  const [projectList, setProjectList] = useState(projectListJSON);

  const lightGallery = useRef(null);

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const profileJSON = await response.json();
          setProjectList(profileJSON.data.projects);
        }
      } catch (err) {
        console.error(err.message || err);
      }
    })();

    return () => {};
  }, []);

  return (
    <section
      id="projects"
      className="tw-flex tw-w-full tw-scroll-mt-8 tw-flex-col tw-items-center tw-justify-evenly tw-bg-gradient-primary-2 tw-p-6 sm:tw-scroll-m-0 sm:tw-p-12 lg:tw-p-24"
    >
      <div
        className="tw-my-8 tw-w-full tw-border-b-2 tw-border-b-primary-200 tw-pb-2"
        data-aos="fade-up"
      >
        <h3 className="tw-text-2xl tw-font-extrabold tw-uppercase tw-tracking-widest tw-text-primary-100">
          Projects
        </h3>
      </div>
      <div></div>
      <ul className="tw-flex tw-flex-wrap tw-items-stretch tw-justify-evenly tw-gap-x-20 tw-gap-y-24">
        {projectList?.length > 0 &&
          projectList.map((projectData, idx) => {
            return (
              <li
                key={idx}
                className="tw-flex tw-w-min tw-flex-col tw-gap-y-5 tw-rounded-md tw-bg-primary-800/50 tw-p-7"
                data-aos="fade-up"
                data-aos-delay={50 * idx}
              >
                <div className="xsm:tw-w-80 tw-w-64 tw-overflow-hidden tw-rounded-t">
                  {projectData?.image ? (
                    <button
                      className="tw-block"
                      onClick={() => {
                        lightGallery.current.refresh([
                          {
                            src: projectData?.image,
                            thumb: projectData?.image,
                            alt: projectData?.title,
                            subHtml: `<div class="lightGallery-captions"><p>${projectData?.title}</p></div`,
                          },
                          ...projectData?.imageList.map((img) => ({
                            src: img,
                            thumb: img,
                            alt: projectData?.title,
                            subHtml: `<div class="lightGallery-captions"><p>${projectData?.title}</p></div`,
                          })),
                        ]);
                        lightGallery.current.openGallery(0);
                      }}
                    >
                      <img
                        src={projectData?.image}
                        alt={"Thumbnail Project " + projectData?.title}
                        className="tw-h-full tw-w-full tw-object-contain tw-object-center tw-transition tw-duration-500 hover:tw-scale-105"
                      />
                    </button>
                  ) : (
                    <div className="xsm:tw-w-80 tw-relative tw-flex tw-aspect-video tw-w-64 tw-select-none tw-flex-col tw-items-center tw-justify-center tw-bg-gray-600">
                      <div className="tw-absolute tw-inset-0"></div>
                      {/* mdi:image-off-outline */}
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="tw-text-gray-400/50" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22 20.7L3.3 2L2 3.3l1 1V19c0 1.1.9 2 2 2h14.7l1 1zM5 19V6.3l7.6 7.6l-1.5 1.9L9 13.1L6 17h9.7l2 2zM8.8 5l-2-2H19c1.1 0 2 .9 2 2v12.2l-2-2V5z"></path>
                      </svg>
                      <p className="tw-text-sm tw-font-light tw-uppercase tw-text-gray-400/50">
                        No Image
                      </p>
                    </div>
                  )}
                </div>
                <h4 className="tw-text-2xl tw-font-bold tw-text-primary-100">
                  {projectData?.title}
                </h4>
                <p className="tw-flex-grow tw-text-primary-300">
                  {projectData?.description}
                </p>
                <div className="tw-flex tw-items-center tw-justify-between">
                  <ul>
                    {projectData?.tags?.length > 0 &&
                      projectData.tags.map((tag, idx2) => {
                        return (
                          <li
                            key={idx2}
                            className="tw-text-sm tw-font-light tw-text-primary-300"
                          >
                            {tag}
                          </li>
                        );
                      })}
                  </ul>
                  <ul>
                    {projectData?.links?.length > 0 &&
                      projectData.links
                        .filter((link) => link?.url)
                        .map((link, idx2) => {
                          return (
                            <li key={idx2} className="tw-text-primary-300">
                              {link?.icon === "github" && ""}
                              {link?.url?.startsWith("http") ? (
                                <a
                                  href={link?.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className=""
                                >
                                  {/* heroicons:link-20-solid */}
                                  {/* prettier-ignore */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                                    <g fill="currentColor">
                                      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865a.75.75 0 0 0 .977-1.138a2.5 2.5 0 0 1-.142-3.667z"></path>
                                      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138q.072.062.142.131a2.5 2.5 0 0 1 0 3.536l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865"></path>
                                    </g>
                                  </svg>
                                  <span className="tw-sr-only">
                                    Open {projectData?.title}
                                  </span>
                                </a>
                              ) : (
                                <Link href={link?.url}>
                                  {/* heroicons:link-20-solid */}
                                  {/* prettier-ignore */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20">
                                    <g fill="currentColor">
                                      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865a.75.75 0 0 0 .977-1.138a2.5 2.5 0 0 1-.142-3.667z"></path>
                                      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138q.072.062.142.131a2.5 2.5 0 0 1 0 3.536l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865"></path>
                                    </g>
                                  </svg>
                                  <span className="tw-sr-only">
                                    Open {projectData?.title}
                                  </span>
                                </Link>
                              )}
                            </li>
                          );
                        })}
                  </ul>
                </div>
              </li>
            );
          })}
      </ul>

      <LightGallery
        onInit={onInit}
        elementClassNames={"projects"}
        dynamic={true}
        plugins={[lgZoom, lgThumbnail]}
      />
    </section>
  );
};

export default Projects;
