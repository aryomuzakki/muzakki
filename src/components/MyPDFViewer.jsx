"use client"

import { useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

const MyPDFViewer = ({ pathOrFileData, filename = "file.pdf" }) => {

  const isValidDataURL = (string) => {
    const validDataURLRegex = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i;
    const result = validDataURLRegex.test(string);
    return result;
  }

  const isPDFDataURL = isValidDataURL(pathOrFileData);

  const defaultPDF = "/get-raw?filename=data/cv_muhammad_aryo_muzakki&format=dataurl";

  const [file, setFile] = useState(isPDFDataURL ? pathOrFileData : "");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const getRaw = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (isPDFDataURL) {
      setFile(pathOrFileData)
    } else {
      (async () => {
        const res = await getRaw(pathOrFileData || defaultPDF);
        setFile(res.data);
      })()
    }

    return () => {

    }
  }, [])

  const loadError = (error) => {
    console.log("Error load: ", error.message)
  }
  const sourceError = (error) => {
    console.log("Error source: ", error.message)
  }

  return (
    <div className="tw-min-h-screen tw-bg-zinc-600">
      <header className="tw-fixed tw-z-50 tw-bg-zinc-800 tw-shadow-[0_1px_4px_rgba(0,0,0,0.3)] tw-flex tw-items-center tw-justify-between tw-p-2 tw-h-14 tw-w-full">
        <div className="tw-pl-4 tw-flex tw-justify-between tw-w-full">
          <div className="">
            <h1>{filename}</h1>
          </div>
          <div className="">
            <p>{numPages}</p>
          </div>
        </div>
        <div className="tw-pr-4 tw-w-full">
          <div className="tw-flex tw-justify-end">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={14} strokeDashoffset={14} d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="14;0" /></path><path strokeDasharray={18} strokeDashoffset={18} d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="18;0" /></path></g>
              </svg>
            </button>
          </div>
        </div>
      </header >
      <div className="tw-pt-14">
        <div className="" ref={setContainerRef}>
          <Document
            file={file}
            onLoadError={loadError}
            onSourceError={sourceError}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            { }
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
            ))}
          </Document>
        </div>
      </div>
    </div >
  )
}

export default MyPDFViewer