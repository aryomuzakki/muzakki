import WebDemoViewer from "@/components/WebDemoViewer";
import { useSearchParams } from "next/navigation"

const demo = () => {
  const params = useSearchParams();

  console.log("params: ", params);
  console.log("url: ", params.get("url"));

  const src = params.get("url");

  return (
    <div>
      <WebDemoViewer src={src} />
    </div>
  )
}

export default demo