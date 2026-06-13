"use client";

import React, { useRef } from "react";
import { ExternalLink } from "lucide-react";
import BlurIn from "../ui/blur-in";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Stacks", href: "#stacks" },
  { label: "Experiences", href: "#experiences" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "PFWA", href: "https://pfwa.muzakki.id", isExternal: true },
];

interface NavContentProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => void;
}

const NavContent: React.FC<NavContentProps> = ({ onLinkClick }) => {
  return (
    <>
      {NAV_ITEMS.map(item => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={e => onLinkClick(e, item.href, item.isExternal)}
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            className="tw-inline-flex tw-items-center tw-gap-1.5 !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
          >
            <BlurIn word={item.label} />
            {item.isExternal && <ExternalLink className="tw-h-3.5 tw-w-3.5" />}
          </a>
        </li>
      ))}
    </>
  );
};

const Header: React.FC = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean,
  ) => {
    if (isExternal) {
      detailsRef.current?.removeAttribute("open");
      return;
    }

    e.preventDefault();
    detailsRef.current?.removeAttribute("open");

    const targetHash = href.replace("#", "");
    const element = document.getElementById(targetHash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="glass-bg-primary tw-fixed tw-z-10 tw-flex tw-w-full tw-justify-center tw-border-b tw-border-primary-800 tw-bg-opacity-75 tw-px-6 tw-py-3 sm:tw-px-12 lg:tw-px-24">
      <div className="tw-mr-auto tw-flex tw-items-center">
        <p className="tw-select-none tw-py-2 tw-font-semibold tw-text-primary-100">
          <BlurIn word="M Aryo Muzakki" />
        </p>
      </div>
      <nav className="tw-text-primary-100">
        <ul className="tw-hidden tw-items-center tw-justify-center sm:tw-flex lg:tw-gap-x-4">
          <NavContent onLinkClick={handleLinkClick} />
        </ul>
        <details
          ref={detailsRef}
          className="tw-du-dropdown tw-du-dropdown-end sm:!tw-hidden"
        >
          <summary className="tw-du-btn tw-du-btn-circle tw-du-btn-ghost tw-du-btn-sm tw-h-10 tw-w-10 hover:!tw-bg-transparent hover:tw-text-primary-500">
            {/* navigation-20-filled */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75m0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75M2.75 14a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"
              />
            </svg>
          </summary>
          <ul className="glass-bg-primary tw-du-menu tw-du-dropdown-content tw-z-[1] tw-mt-8 tw-w-52 tw-overflow-hidden tw-rounded-lg tw-p-2 tw-shadow">
            <NavContent onLinkClick={handleLinkClick} />
          </ul>
        </details>
      </nav>
    </header>
  );
};

export default Header;
