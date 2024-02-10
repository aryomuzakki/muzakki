import fs from "fs";
import path from "path";

import MyPDFViewer from "@/components/MyPDFViewer"

const PortfolioPDF = () => {
  const pdfFileDataURL = (filePath) => {
    const pdfBase64 = Buffer.from(fs.readFileSync(filePath)).toString("base64");
    return `data:application/pdf;base64,${pdfBase64}`;
  }

  const fileData = pdfFileDataURL(path.join(process.cwd(), "public/data/Portfolio Muhammad Aryo Muzakki May 2023_compressed.pdf"));

  return (
    <MyPDFViewer pathOrFileData={fileData} />
  )
}

export default PortfolioPDF