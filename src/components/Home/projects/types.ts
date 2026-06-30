export interface ProjectLink {
  icon: string;
  url: string;
  title?: string;
}

export interface ProjectData {
  categories: string[];
  time: string;
  role: string;
  title: string;
  description: string;
  image: string;
  imageList: string[];
  links: ProjectLink[];
  tags: string[];
}
