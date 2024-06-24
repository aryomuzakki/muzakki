"use client";

import { useEffect } from "react";

const NavContent = () => {
  return (
    <>
      <li className="">
        <a
          href="#home"
          className="scroll-to-view tw-inline-block !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
        >
          Home
        </a>
      </li>
      <li className="">
        <a
          href="#stacks"
          className="scroll-to-view tw-inline-block !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
        >
          Stacks
        </a>
      </li>
      <li className="">
        <a
          href="#experiences"
          className="scroll-to-view tw-inline-block !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
        >
          Experiences
        </a>
      </li>
      <li className="">
        <a
          href="#projects"
          className="scroll-to-view tw-inline-block !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
        >
          Projects
        </a>
      </li>
      <li className="">
        <a
          href="#contact"
          className="scroll-to-view tw-inline-block !tw-rounded-sm tw-px-4 tw-py-2 tw-transition hover:!tw-bg-transparent hover:tw-text-primary-500 focus:!tw-bg-transparent focus:!tw-text-primary-300 focus:!tw-outline-current"
        >
          Contact
        </a>
      </li>
    </>
  );
};

const Header = () => {
  const scrollToSection = (ev) => {
    ev.preventDefault();

    const targetHash = new URL(ev.target.href).hash.replace("#", "");

    document.getElementById(targetHash).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll("a.scroll-to-view");

    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", scrollToSection);
    });

    return () => {
      navLinks.forEach((navLink) => {
        navLink.removeEventListener("click", scrollToSection);
      });
    };
  }, []);

  return (
    <header className="glass-bg-primary tw-fixed tw-z-10 tw-flex tw-w-full tw-justify-center tw-border-b tw-border-primary-800 tw-bg-opacity-75 tw-px-6 tw-py-3 sm:tw-px-12 lg:tw-px-24">
      <div className="tw-mr-auto tw-flex tw-items-center">
        <p className="tw-py-2 tw-font-semibold tw-text-primary-500">Aryo</p>
      </div>
      <nav className="tw-text-primary-100">
        <ul className="tw-hidden tw-items-center tw-justify-center sm:tw-flex lg:tw-gap-x-4">
          <NavContent />
        </ul>
        <details className="tw-du-dropdown tw-du-dropdown-end sm:!tw-hidden">
          <summary className="tw-du-btn tw-du-btn-circle tw-du-btn-ghost tw-du-btn-sm tw-h-10 tw-w-10 hover:!tw-bg-transparent hover:tw-text-primary-500">
            {/* navigation-20-filled */}
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
              <path fill="currentColor" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75m0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75M2.75 14a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"></path>
            </svg>
          </summary>
          <ul className="glass-bg-primary tw-du-menu tw-du-dropdown-content tw-z-[1] tw-mt-8 tw-w-52 tw-overflow-hidden tw-rounded-lg tw-p-2 tw-shadow">
            <NavContent />
          </ul>
        </details>
      </nav>
    </header>
  );
};

export default Header;
