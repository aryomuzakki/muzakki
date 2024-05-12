import fs from "fs";
import path from "path";

const isFileExist = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const fileRaw = (pathOrFilename) => {
  const pdfPaths = [
    `${pathOrFilename}.pdf`,
    `public/data/${pathOrFilename}.pdf`,
    "public/data/cv_muhammad_aryo_muzakki.pdf",
  ];

  let pdfRaw = null;

  pdfPaths.forEach((pdfPath) => {
    const pdfFilePath = path.join(process.cwd(), pdfPath);
    if (!pdfRaw) {
      if (isFileExist(pdfFilePath)) {
        pdfRaw = fs.readFileSync(pdfFilePath);
      }
    }
  });

  return pdfRaw;
};

const fileToBase64 = (pathOrFilename) => {
  // const pdfPaths = [`${pathOrFilename}.pdf`, `public/data/${pathOrFilename}.pdf`, "public/data/cv_muhammad_aryo_muzakki.pdf"];

  // let pdfBase64 = null;

  // pdfPaths.forEach(pdfPath => {
  //   const pdfFilePath = path.join(process.cwd(), pdfPath);
  //   if (!pdfBase64) {
  //     if (isFileExist(pdfFilePath)) {
  //       pdfBase64 = Buffer.from(fs.readFileSync(pdfFilePath)).toString("base64");
  //     }
  //   }
  // })

  const pdfBase64 = Buffer.from(fileRaw(pathOrFilename)).toString("base64");

  return pdfBase64;
};

const fileToDataURL = (pathOrFilename) => {
  const pdfDataURL = `data:application/pdf;base64,${fileToBase64(pathOrFilename)}`;

  return pdfDataURL;
};

export async function GET(request) {
  const filename = request.nextUrl.searchParams.get("filename");
  const isDataURL = request.nextUrl.searchParams.get("format") === "dataurl";
  const isBase64 = request.nextUrl.searchParams.get("format") === "base64";
  const responseType =
    request.nextUrl.searchParams.get("responseType") || "json";

  let data;

  if (responseType === "raw") {
    data = fileRaw(filename);
    const response = new Response(data, {
      headers: {
        "content-type": "application/pdf",
        // force download and provide filename
        // "content-disposition": `attachment; filename=${filename.split("/").pop()}.pdf`,
      },
    });

    return response;
  } else {
    if (isDataURL && !isBase64) {
      data = fileToDataURL(filename);
    } else if (!isDataURL && isBase64) {
      data = fileToBase64(filename);
    } else {
      return Response.json({
        data: null,
        message: `please specify a format, "base64" or "dataurl"`,
      });
    }
    return responseType === "json"
      ? Response.json({
          data: fileToDataURL(filename),
        })
      : Response.json({
          message: `the responseType "${responseType}" is not recognized. Use "raw" or "json"`,
        });
  }
}
