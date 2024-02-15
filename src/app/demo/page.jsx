import WebDemoViewer from "@/components/WebDemoViewer";
import { Suspense } from "react";

const demo = () => {

  return (
    <div>
      <Suspense>
        <WebDemoViewer />
      </Suspense>
    </div>
  )
}

export default demo