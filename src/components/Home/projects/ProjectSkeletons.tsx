import React from "react";

export const ProjectCardSkeleton = () => {
  return (
    <div className="tw-flex tw-w-full tw-flex-col tw-gap-y-5 tw-rounded-md tw-bg-primary-800/30 tw-p-7 tw-animate-pulse">
      {/* Thumbnail Aspect-Ratio box */}
      <div className="tw-aspect-video tw-w-full tw-rounded tw-bg-primary-900/60" />
      
      {/* Title placeholder */}
      <div className="tw-h-8 tw-w-3/4 tw-rounded tw-bg-primary-900/60" />
      
      {/* Description lines */}
      <div className="tw-flex-grow tw-space-y-2">
        <div className="tw-h-4 tw-w-full tw-rounded tw-bg-primary-900/60" />
        <div className="tw-h-4 tw-w-5/6 tw-rounded tw-bg-primary-900/60" />
        <div className="tw-h-4 tw-w-2/3 tw-rounded tw-bg-primary-900/60" />
      </div>
      
      {/* Footer (tags & links) */}
      <div className="tw-flex tw-items-center tw-justify-between tw-pt-2">
        <div className="tw-h-4 tw-w-1/4 tw-rounded tw-bg-primary-900/60" />
        <div className="tw-h-6 tw-w-16 tw-rounded tw-bg-primary-900/60" />
      </div>
    </div>
  );
};

export const ProjectSkeletons = () => {
  return (
    <div className="tw-grid tw-w-full tw-gap-8 md:tw-grid-cols-2 xl:tw-grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
};
