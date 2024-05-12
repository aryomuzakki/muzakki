import fs from "fs";
import path from "path";

import MyPDFViewer from "@/components/PDFViewer/MyPDFViewer";

const PortfolioPDF = () => {
  const pdfFileDataURL = (filePath) => {
    const pdfBase64 = Buffer.from(fs.readFileSync(filePath)).toString("base64");
    return `data:application/pdf;base64,${pdfBase64}`;
  };

  const fileData = pdfFileDataURL(
    path.join(
      process.cwd(),
      "public/data/portfolio_muhammad_aryo_muzakki_may_2023.pdf",
    ),
  );

  return <MyPDFViewer pathOrFileData={fileData} />;
};

export default PortfolioPDF;
