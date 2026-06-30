import React from "react";
import Link from "next/link";
import SILoader from "../../SILoader";
import { ProjectData } from "./types";

interface ProjectCardProps {
  projectData: ProjectData;
  idx: number;
  onOpenGallery: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  projectData,
  idx,
  onOpenGallery,
}) => {
  return (
    <li
      className="tw-flex tw-w-full tw-flex-col tw-gap-y-5 tw-rounded-md tw-bg-primary-800/50 tw-p-7"
      data-aos="fade-up"
      data-aos-delay={25 * idx}
    >
      <div className="tw-w-full tw-overflow-hidden tw-rounded">
        {projectData?.image ? (
          <button
            className="tw-block"
            onClick={() => onOpenGallery(projectData)}
          >
            <img
              src={projectData?.image}
              alt={"Thumbnail Project " + projectData?.title}
              className="tw-h-full tw-w-full tw-object-contain tw-object-center tw-transition tw-duration-500 hover:tw-scale-105"
              loading="lazy"
            />
          </button>
        ) : (
          <div className="tw-relative tw-flex tw-aspect-video tw-w-full tw-select-none tw-flex-col tw-items-center tw-justify-center tw-bg-gray-600">
            <div className="tw-absolute tw-inset-0"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="tw-text-gray-400/50"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 20.7L3.3 2L2 3.3l1 1V19c0 1.1.9 2 2 2h14.7l1 1zM5 19V6.3l7.6 7.6l-1.5 1.9L9 13.1L6 17h9.7l2 2zM8.8 5l-2-2H19c1.1 0 2 .9 2 2v12.2l-2-2V5z"
              ></path>
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
      <p className="tw-flex-grow tw-text-primary-300">{projectData?.description}</p>
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
        <ul className="tw-flex tw-gap-x-2">
          {projectData?.links?.length > 0 &&
            projectData.links
              .filter(link => link?.url)
              .map((link, idx2) => {
                return (
                  <li
                    key={idx2}
                    className="tw-text-primary-300"
                  >
                    {link?.icon === "github" && (
                      <a
                        href={link?.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="tw-transition tw-duration-300 hover:tw-text-primary-50"
                      >
                        <SILoader iconName="SiGithub" />
                        <span className="tw-sr-only">
                          Open {projectData?.title} Github Repository
                        </span>
                      </a>
                    )}
                    {link?.icon !== "github" && link?.url?.startsWith("http") ? (
                      <a
                        href={link?.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="tw-transition tw-duration-300 hover:tw-text-primary-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-globe-icon lucide-globe"
                        >
                          <circle
                            cx={12}
                            cy={12}
                            r={10}
                          />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                        <span className="tw-sr-only">
                          Open {link?.title || projectData?.title}
                        </span>
                      </a>
                    ) : (
                      link?.icon !== "github" && (
                        <Link
                          href={link?.url}
                          className="tw-transition tw-duration-300 hover:tw-text-primary-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-globe-icon lucide-globe"
                          >
                            <circle
                              cx={12}
                              cy={12}
                              r={10}
                            />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                          <span className="tw-sr-only">Open {projectData?.title}</span>
                        </Link>
                      )
                    )}
                  </li>
                );
              })}
        </ul>
      </div>
    </li>
  );
};
