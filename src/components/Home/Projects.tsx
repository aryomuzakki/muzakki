"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { useQueryState, parseAsString } from "nuqs";

import { projectList as projectListData } from "@/app/api/profile/projectList";
import { useIsClient } from "@/hooks/use-is-client";
import { ProjectFilters } from "./projects/ProjectFilters";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectSkeletons } from "./projects/ProjectSkeletons";
import { ProjectData } from "./projects/types";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

const Projects = () => {
  const [projectList, setProjectList] = useState<ProjectData[]>(projectListData);
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );
  const [activeTag, setActiveTag] = useQueryState("tag", parseAsString.withDefault("all"));

  const lightGallery = useRef<any>(null);
  const isClient = useIsClient();

  const onInit = useCallback((detail: any) => {
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
      } catch (err: any) {
        console.error(err.message || err);
      }
    })();
  }, []);

  // Dynamically extract categories available in the actual list
  const availableCategories = [
    "all",
    ...Array.from(new Set(projectList.flatMap(p => p.categories))),
  ];

  // Dynamically extract tags for the currently active category
  const availableTags = [
    "all",
    ...Array.from(
      new Set(
        projectList
          .filter(p => activeCategory === "all" || p.categories.includes(activeCategory))
          .flatMap(p => p.tags),
      ),
    ),
  ];

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    setActiveTag("all");
  };

  const handleOpenGallery = (projectData: ProjectData) => {
    if (lightGallery.current) {
      lightGallery.current.refresh([
        {
          src: projectData.image,
          thumb: projectData.image,
          alt: projectData.title,
          subHtml: `<div class="lightGallery-captions"><p>${projectData.title}</p></div>`,
        },
        ...projectData.imageList.map(img => ({
          src: img,
          thumb: img,
          alt: projectData.title,
          subHtml: `<div class="lightGallery-captions"><p>${projectData.title}</p></div>`,
        })),
      ]);
      lightGallery.current.openGallery(0);
    }
  };

  const filteredProjects = projectList.filter(project => {
    const matchesCategory = activeCategory === "all" || project.categories.includes(activeCategory);
    const matchesTag = activeTag === "all" || project.tags.includes(activeTag);
    return matchesCategory && matchesTag;
  });

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

      {!isClient ? (
        <ProjectSkeletons />
      ) : (
        <>
          <ProjectFilters
            activeCategory={activeCategory}
            activeTag={activeTag}
            availableCategories={availableCategories}
            availableTags={availableTags}
            onCategoryChange={handleCategoryChange}
            onTagChange={setActiveTag}
          />

          <ul className="tw-grid tw-gap-8 md:tw-grid-cols-2 xl:tw-grid-cols-3">
            {filteredProjects?.length > 0 &&
              filteredProjects.map((projectData, idx) => (
                <ProjectCard
                  key={`${projectData.title}-${idx}`}
                  projectData={projectData}
                  idx={idx}
                  onOpenGallery={handleOpenGallery}
                />
              ))}
          </ul>
        </>
      )}

      <LightGallery
        onInit={onInit}
        elementClassNames="projects"
        dynamic={true}
        plugins={[lgZoom, lgThumbnail]}
      />
    </section>
  );
};

export default Projects;
