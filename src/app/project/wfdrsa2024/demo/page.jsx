import WebDemoViewer from "@/components/WebDemoViewer";
import { Suspense } from "react";

const ProjectDemo = () => {
  return (
    <div>
      <Suspense>
        <WebDemoViewer
          url="https://wfdrsa2024.muzakki.id/"
          title="WFD RSA 2024"
        />
      </Suspense>
    </div>
  );
};

export default ProjectDemo;
