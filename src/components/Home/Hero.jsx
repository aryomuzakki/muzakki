import dynamic from "next/dynamic";
import HyperText from "../ui/hyper-text";
import BlurFade from "../ui/blur-fade";
import BlurIn from "../ui/blur-in";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

const Hero = () => {
  return (
    <section
      id="home"
      className="tw-relative tw-flex tw-min-h-screen tw-w-full tw-items-center tw-justify-between tw-bg-gradient-primary tw-p-6 sm:tw-p-12 lg:tw-p-24"
    >
      <Particles />
      <div className="glass-bg-primary-2 tw-pointer-events-none tw-relative tw-z-[1] tw-max-w-screen-sm tw-overflow-hidden tw-rounded-lg tw-p-6 md:tw-max-w-3xl lg:tw-max-w-4xl">
        <h1 className="tw-pointer-events-auto tw-mb-2 tw-flex tw-flex-wrap tw-text-4xl tw-font-extrabold tw-uppercase tw-tracking-wider tw-text-primary-100">
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="Muhammad "
          />
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="Aryo "
          />
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="Muzakki"
          />
        </h1>
        <h2 className="tw-pointer-events-auto tw-mb-5 tw-flex tw-flex-wrap tw-text-xl tw-uppercase tw-tracking-widest tw-text-primary-100">
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="FRONT-END / "
          />
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="BACK-END "
          />
          <HyperText
            wrapperClassName="!tw-py-0"
            className="tw-flex-shrink-0 !tw-font-[inherit]"
            duration="100"
            text="WEB DEVELOPER"
          />
        </h2>
        <p className="tw-pointer-events-auto tw-mb-5 tw-leading-6 tw-text-primary-100">
          <BlurIn
            word={`
              I'm the person who will produce a user-friendly, responsive websites
              that leave a lasting impression. I'll provide a well-structured,
              maintainable code, and leveraging modern technology to upscale your
              business.
              `}
          />
        </p>
        <div className="tw-flex tw-translate-y-1.5 tw-flex-wrap tw-items-center tw-gap-4">
          <BlurFade className="tw-flex" inView>
            <a
              href="#contact"
              className="scroll-to-view tw-relative tw-overflow-hidden tw-rounded-[calc(var(--radius)_+_0.125rem)] tw-px-0.5 tw-py-0.5 tw-text-primary-100 tw-transition tw-duration-200 hover:tw-scale-105 active:tw-scale-95"
              rel="noopener noreferrer"
            >
              <span className="tw-absolute tw-inset-[-1000%] tw-animate-[spin_2s_linear_infinite] tw-bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="btn-primary tw-inline-flex tw-h-full tw-w-full tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-backdrop-blur-3xl hover:!tw-scale-100">
                {/* mdi:contact */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" className="tw-mr-2">
                <path fill="currentColor" d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"></path>
              </svg>
                Contact
              </span>
            </a>
          </BlurFade>
          <BlurFade className="tw-flex" delay={0.5} inView>
            <a
              href="/cv"
              className="btn-primary btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* ph:read-cv-logo-fill */}
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256" className="tw-mr-2">
              <path fill="currentColor" d="m210.78 39.25l-130.25-23A16 16 0 0 0 62 29.23l-29.75 169a16 16 0 0 0 13 18.53l130.25 23a16 16 0 0 0 18.54-13l29.75-169a16 16 0 0 0-13.01-18.51m-75.28 92.31a8 8 0 0 1-7.87 6.61a8.3 8.3 0 0 1-1.4-.12l-41.5-7.33A8 8 0 0 1 87.52 115l41.48 7.29a8 8 0 0 1 6.5 9.27m47-24.18a8 8 0 0 1-7.86 6.61a7.6 7.6 0 0 1-1.41-.13l-83-14.65a8 8 0 0 1 2.79-15.76l83 14.66a8 8 0 0 1 6.51 9.27Zm5.55-31.52a8 8 0 0 1-7.87 6.61a8.4 8.4 0 0 1-1.4-.12l-83-14.66a8 8 0 1 1 2.78-15.75l83 14.65a8 8 0 0 1 6.52 9.27Z"></path>
            </svg>
              Read CV
            </a>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
