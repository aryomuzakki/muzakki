import fs from "fs";
import path from "path";

import MyPDFViewer from "@/components/MyPDFViewer"

const CV = () => {

  const pdfFileDataURL = (filePath) => {
    const pdfBase64 = Buffer.from(fs.readFileSync(filePath)).toString("base64");
    return `data:application/pdf;base64,${pdfBase64}`;
  }

  const filename = "cv_muhammad_aryo_muzakki.pdf";
  const fileData = pdfFileDataURL(path.join(process.cwd(), `public/data/${filename}`));

  return (
    <MyPDFViewer pathOrFileData={fileData} filename={filename} />
  )
}

export default CV