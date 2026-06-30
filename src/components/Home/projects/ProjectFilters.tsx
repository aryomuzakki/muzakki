import React from "react";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  activeCategory: string;
  activeTag: string;
  availableCategories: string[];
  availableTags: string[];
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
}

const categoryLabels: Record<string, string> = {
  all: "All",
  website: "Websites",
  "browser-extension": "Extensions",
  "desktop-app": "Desktop Apps",
  tools: "Tools",
};

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeCategory,
  activeTag,
  availableCategories,
  availableTags,
  onCategoryChange,
  onTagChange,
}) => {
  return (
    <div
      className="tw-mb-10 tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-y-4"
      data-aos="fade-up"
    >
      {/* Category Pills */}
      <div className="tw-flex tw-w-full tw-flex-wrap tw-justify-center tw-gap-3">
        {availableCategories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "tw-rounded-full tw-border tw-px-5 tw-py-2 tw-text-sm tw-font-semibold tw-transition-all tw-duration-300",
                isActive
                  ? "tw-border-primary-500 tw-bg-primary-500 tw-text-primary-950 tw-shadow-lg tw-shadow-primary-500/25"
                  : "tw-border-primary-800 tw-bg-primary-900/30 tw-text-primary-300 hover:tw-border-primary-700 hover:tw-bg-primary-800/50 hover:tw-text-primary-100",
              )}
            >
              {categoryLabels[cat] || cat}
            </button>
          );
        })}
      </div>

      {/* Tag Selector */}
      {availableTags.length > 1 && (
        <div className="tw-flex tw-w-full tw-flex-wrap tw-justify-center tw-gap-2 tw-border-t tw-border-primary-800/40 tw-pt-4">
          {availableTags.map(t => {
            const isActive = activeTag === t;
            return (
              <button
                key={t}
                onClick={() => onTagChange(t)}
                className={cn(
                  "tw-rounded-full tw-border tw-px-3.5 tw-py-1 tw-text-xs tw-transition-all tw-duration-300",
                  isActive
                    ? "tw-border-primary-400/40 tw-bg-primary-400/20 tw-text-primary-200"
                    : "tw-border-transparent tw-bg-transparent tw-text-primary-400 hover:tw-bg-primary-900/40 hover:tw-text-primary-300",
                )}
              >
                {t === "all" ? "All Tags" : `#${t}`}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
