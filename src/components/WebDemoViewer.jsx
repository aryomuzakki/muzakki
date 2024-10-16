"use client";

import { useWindowSize } from "@react-hook/window-size/throttled";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ResponsiveIframeViewer } from "react-responsive-iframe-viewer";
import "react-responsive-iframe-viewer/dist/style.css";

const VIEW_SIZES = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 640,
    height: 1136,
  },
  desktop: {
    width: 1280,
    height: 720,
  },
  xl: {
    width: 1536,
    height: 864,
  },
  full: {
    width: "100%",
    height: "100%",
  },
};

// Viewport toggle options
const ViewportOptions = ({ viewSize, setViewSize }) => {
  return (
    <>
      {Object.keys(VIEW_SIZES).map((item, idx) => {
        return (
          <li key={idx}>
            <button
              className={`${item === viewSize ? "tw-text-primary-500" : "tw-text-white"} tw-px-2 tw-py-1 tw-text-sm tw-uppercase tw-transition hover:tw-text-primary-500 active:tw-text-primary-300`}
              onClick={(ev) => {
                setViewSize(item);
              }}
            >
              {item.replace(/([a-z])([A-Z])/g, "$1 $2")}
            </button>
          </li>
        );
      })}
    </>
  );
};

const WebDemoViewer = ({ url, title }) => {
  const params = useSearchParams();
  const [winWidth, winHeight] = useWindowSize();

  const [viewSize, setViewSize] = useState("full");
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const [viewSizeOpts, setViewSizeOpts] = useState(VIEW_SIZES[viewSize]);

  const paramsURL = params.get("url");

  useEffect(() => {
    if (viewSize === "full") {
      setViewSizeOpts(VIEW_SIZES[viewSize]);
    } else {
      const viewerWidth = VIEW_SIZES[viewSize].width;
      const viewerHeight = VIEW_SIZES[viewSize].height;
      const wHeight = winHeight - 88;
      const widthScale = winWidth / viewerWidth;
      const heightScale = wHeight / viewerHeight;

      const scaleRatio = Math.min(widthScale, heightScale);

      if (viewerHeight > wHeight || viewerWidth > winWidth) {
        setViewSizeOpts({
          width: viewerWidth * scaleRatio - 48,
          height: viewerHeight * scaleRatio - 48,
        });
      } else {
        setViewSizeOpts(VIEW_SIZES[viewSize]);
      }
    }

    return () => {};
  }, [winWidth, winHeight, viewSize]);

  return (
    <div>
      {url ? (
        <>
          <div className="tw-flex tw-items-center tw-justify-between tw-px-8 tw-py-4">
            <Link href="/">Home</Link>
            <p className="tw-mx-auto">{title}</p>
            <div className="tw-hidden tw-items-center md:tw-flex md:tw-gap-4">
              <p className="tw-text-sm tw-text-opacity-70">Viewport Sizes :</p>
              <ul className="tw-flex tw-gap-1 lg:tw-gap-2">
                <ViewportOptions
                  viewSize={viewSize}
                  setViewSize={setViewSize}
                />
              </ul>
            </div>
            <details
              className="tw-du-dropdown tw-du-dropdown-end md:!tw-hidden"
              open={dropdownOpened}
              onClick={(ev) => {
                ev.preventDefault();
                setDropdownOpened((prevState) => !prevState);
              }}
            >
              <summary className="tw-du-btn tw-du-btn-ghost tw-du-btn-sm hover:!tw-bg-transparent hover:tw-text-primary-500">
                <p className="tw-text-sm tw-text-opacity-70">Viewport Sizes</p>
                {/* radix-icons:triangle-down */}
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 15 15" className={`tw-transition tw-duration-500 ${dropdownOpened ? "-tw-rotate-180": ""}`}>
                  <path fill="currentColor" d="M4 6h7l-3.5 4.5z"></path>
                </svg>
              </summary>
              <ul className="glass-bg-primary tw-du-menu tw-du-dropdown-content tw-z-[1] tw-mt-8 tw-w-52 tw-overflow-hidden tw-rounded-lg tw-p-2 tw-shadow">
                <ViewportOptions
                  viewSize={viewSize}
                  setViewSize={setViewSize}
                />
              </ul>
            </details>
          </div>
          <div
            style={{
              height: "calc(100vh - 60px)",
            }}
            className="tw-w-screen tw-pb-4 tw-pr-4"
          >
            {url ? (
              <div className="tw-h-full tw-overflow-auto">
                <ResponsiveIframeViewer
                  src={url}
                  title={title}
                  {...viewSizeOpts}
                  showControls={false}
                  allowResizingX
                  allowResizingY
                  className="tw-relative !tw-justify-start tw-pb-8 tw-pl-4 tw-pr-8"
                  resizableContainerClassName=""
                />
              </div>
            ) : (
              <div>
                <p className="tw-px-4">nothing provided</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="tw-flex tw-h-14 tw-items-center">
            <p className="tw-px-4">
              showing live site from : {paramsURL || ".........."}
            </p>
          </div>
          <div style={{ height: "calc(100vh - 3.5rem)" }}>
            {paramsURL ? (
              <iframe src={paramsURL} width="100%" height="100%"></iframe>
            ) : (
              <div>
                <p className="tw-px-4">no link provided</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WebDemoViewer;
