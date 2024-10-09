"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ResponsiveIframeViewer,
  ViewportSize,
} from "react-responsive-iframe-viewer";
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

const WebDemoViewer = ({ url, title }) => {
  const params = useSearchParams();

  // const [viewSize, setViewSize] = useState(ViewportSize.xl);
  const [viewSize, setViewSize] = useState("xl");

  console.log("params: ", params);
  console.log("url: ", params.get("url"));

  const paramsURL = params.get("url");

  return (
    <div>
      {paramsURL ? (
        <>
          <div className="tw-flex tw-h-14 tw-items-center">
            <p className="tw-pl-4">showing live site from : {paramsURL}</p>
          </div>
          <div style={{ height: "calc(100vh - 3.5rem)" }}>
            {paramsURL ? (
              <iframe src={paramsURL} width="100%" height="100%"></iframe>
            ) : (
              <div>
                <p>no link provided</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="tw-flex tw-items-center tw-justify-between tw-px-8 tw-py-4">
            <Link href="/">Home</Link>
            <p className="tw-mx-auto">{title}</p>
            <div className="tw-flex tw-items-center tw-gap-4">
              <p className="tw-text-sm tw-text-opacity-70">Viewport Sizes :</p>
              <ul className="tw-flex tw-gap-2">
                {Object.keys(VIEW_SIZES).map((item, idx) => {
                  return (
                    <li key={idx}>
                      <button
                        className={`${item === viewSize ? "tw-text-primary-500" : "tw-text-white"} tw-px-2 tw-py-1 tw-text-sm tw-uppercase tw-transition hover:tw-text-primary-500 active:tw-text-primary-300`}
                        onClick={(ev) => {
                          // setViewSize(ViewportSize.mobile);
                          setViewSize(item);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            style={{
              ...(viewSize === "full"
                ? { height: "calc(100vh - 1rem - 60px)" }
                : { "min-height": "calc(100vh - 60px)" }),
            }}
            // className="tw-w-full tw-max-w-[100vw]"
            className="dark"
          >
            {url ? (
              <ResponsiveIframeViewer
                src={url}
                title={title}
                // size={viewSize}
                {...VIEW_SIZES[viewSize]}
                controlsPreComponent={
                  <p className="tw-mr-auto tw-pl-8">{title}</p>
                }
                showControls={false}
                // enabledControls={[
                //   ViewportSize.mobile,
                //   ViewportSize.tablet,
                //   ViewportSize.desktop,
                //   ViewportSize.xl,
                // ]}
                allowResizingX
                allowResizingY
                className="tw-relative !tw-justify-start tw-pl-4 tw-pr-8"
                controlsClassName="tw-pr-4"
                controlsContainerClassName="tw-w-full"
                resizableContainerClassName=""
              />
            ) : (
              <div>
                <p>no link provided</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WebDemoViewer;
