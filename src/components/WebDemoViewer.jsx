"use client";

import { useSearchParams } from "next/navigation";

const WebDemoViewer = () => {
  const params = useSearchParams();

  console.log("params: ", params);
  console.log("url: ", params.get("url"));

  const src = params.get("url");

  return (
    <div>
      <div className="tw-h-14 tw-flex tw-items-center">
        <p className="tw-pl-4">
          showing live site from : {src}
        </p>
      </div>
      <div style={{ height: "calc(100vh - 3.5rem)" }}>
        {
          src ? (
            <iframe src={src} width="100%" height="100%"></iframe>
          ) : (
            <div>
              <p>no link provided</p>
            </div>
          )
        }
      </div >
    </div>
  )
}

export default WebDemoViewer