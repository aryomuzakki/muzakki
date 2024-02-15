"use client"

import { useCallback, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page, Outline } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import debounce from 'lodash.debounce';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = "/dist/js/pdf.worker.min.js";

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

const isValidDataURL = (string) => {
  const validDataURLRegex = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i;
  const result = validDataURLRegex.test(string);
  return result;
}

const defaultPDF = "/get-raw?filename=data/cv_muhammad_aryo_muzakki&format=dataurl";

const MyPDFViewer = ({ pathOrFileData, filename = "file.pdf" }) => {

  const isPDFDataURL = isValidDataURL(pathOrFileData);

  const [file, setFile] = useState(isPDFDataURL ? pathOrFileData : "");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [zoomPercentVal, setZoomPercentVal] = useState(100);
  const [scale, setScale] = useState(zoomPercentVal / 100);

  const searchQueryBox = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

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

  const loadError = (error) => {
    console.log("Error load: ", error.message)
  }
  const sourceError = (error) => {
    console.log("Error source: ", error.message)
  }

  const highlightPattern = (text, pattern) => {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchQuery),
    [searchQuery]
  );

  const toggleOutline = () => {
    setIsOutlineOpen(!isOutlineOpen);
  }

  const toggleSearchBar = () => {
    if (isSearchBarOpen) {
      searchQueryBox.current.blur();
    } else {
      searchQueryBox.current.focus();
    }
    setIsSearchBarOpen(!isSearchBarOpen);
  }

  const downloadPDF = () => {
    const anchorEl = document.createElement("a");
    anchorEl.href = file;
    anchorEl.download = filename;
    anchorEl.target = "_blank";
    document.body.appendChild(anchorEl);
    anchorEl.click();
    document.body.removeChild(anchorEl);
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

  return (
    <div className="tw-min-h-screen tw-bg-zinc-600">
      <header className="tw-fixed tw-z-50 tw-w-full">
        <div className="tw-z-50 tw-relative tw-p-2 tw-h-14 tw-w-full glass-bg-dark tw-shadow-[0_1px_4px_rgba(0,0,0,0.3)] tw-flex tw-items-center tw-justify-between">
          <div className="tw-pl-4 tw-flex tw-justify-between tw-w-full">
            <div className="tw-flex tw-items-center tw-gap-4">
              {
                isOutlineOpen && (
                  <button type="button" className="tw-du-btn tw-du-btn-circle tw-du-btn-sm tw-du-btn-ghost tw-w-10 tw-h-10" onClick={(ev) => { toggleOutline() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 5"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to={0}></set></path><path d="M5 19L19 19"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g>
                    </svg>
                  </button>
                )
              }
              {
                !isOutlineOpen && (
                  <button type="button" className="tw-du-btn tw-du-btn-circle tw-du-btn-sm tw-du-btn-ghost tw-w-10 tw-h-10" onClick={(ev) => { toggleOutline() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2}><path d="M5 5L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity={0}><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to={1}></set></path><path d="M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g>
                    </svg>
                  </button>
                )
              }
              <h1>{filename}</h1>
            </div>
          </div>
          <div className="tw-pr-4 tw-flex tw-justify-between tw-items-center tw-gap-8 tw-flex-shrink-0">
            <div className="">
              <p>{numPages || 0} page{numPages > 1 ? "s" : ""} </p>
            </div>
            <div className="">
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  setScale((parseInt(ev.target.zoomPercent.value) || 100) / 100);
                  setZoomPercentVal(parseInt(ev.target.zoomPercent.value) || 100);
                }}
              >
                <label className="tw-du-input tw-du-input-sm tw-bg-[#48484dbf] tw-backdrop-blur-[16px] tw-backdrop-saturate-[180%] tw-flex tw-items-center tw-gap-2">
                  <input
                    type="text"
                    name="zoomPercent"
                    className="grow tw-w-[28px] tw-text-center"
                    value={zoomPercentVal}
                    onChange={(ev) => {
                      let val = ev.target.value && parseInt(ev.target.value) || -1;
                      if (val > 199) {
                        val = 199;
                      } else if (val < 0) {
                        val = "";
                      }
                      setZoomPercentVal(val);
                    }}
                  />
                  <span className="tw-select-none">%</span>
                </label>
              </form>
            </div>
          </div>
          <div className="tw-pr-4 tw-w-full">
            <div className="tw-flex tw-justify-end tw-gap-4">
              <button type="button" className="tw-du-btn tw-du-btn-circle tw-du-btn-sm tw-du-btn-ghost tw-w-10 tw-h-10" onClick={useCallback((ev) => { toggleSearchBar() })}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 32 32">
                  <path fill="currentColor" d="M12 15H5a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h5V5a1 1 0 0 0-1-1H3V2h6a3 3 0 0 1 3 3zM5 9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5V9zm15 14v2a1 1 0 0 0 1 1h5v-4h-5a1 1 0 0 0-1 1"></path><path fill="currentColor" d="M2 30h28V2Zm26-2h-7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h5v-2a1 1 0 0 0-1-1h-6v-2h6a3 3 0 0 1 3 3Z"></path>
                </svg>
              </button>
              <button type="button" className="tw-du-btn tw-du-btn-circle tw-du-btn-sm tw-du-btn-ghost tw-w-10 tw-h-10" onClick={useCallback((ev) => { downloadPDF() })}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={14} strokeDashoffset={14} d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="14;0" /></path><path strokeDasharray={18} strokeDashoffset={18} d="M12 4 h2 v6 h2.5 L12 14.5M12 4 h-2 v6 h-2.5 L12 14.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="18;0" /></path></g>
                </svg>
              </button>
            </div>
          </div>

        </div>
        {/*  */}
        <div className={`tw-absolute tw-transition-all tw-z-[3] tw-right-16 ${isSearchBarOpen ? "tw-top-16" : "-tw-top-20"}`}>
          <input
            type="text"
            name="searchQuery"
            id="searchQuery"
            onChange={useCallback(debounce((ev) => {
              console.log(ev.target.value)
              setSearchQuery(ev.target.value)
            }, 500))}
            ref={searchQueryBox}
            className="tw-du-input tw-du-input-sm tw-bg-[#1a1a1bbf] tw-backdrop-blur-[16px] tw-backdrop-saturate-[180%] tw-shadow-[0_0_4px_0_#00000080] focus:tw-outline-[#27272a4d]"
          />
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
            <div className={`outline-wrapper glass-bg-dark ${isOutlineOpen ? "tw-left-0" : "-tw-left-96"}`}>
              <div className="scrollable-wrapper">
                <h3 className="tw-font-semibold tw-text-lg tw-mb-3">
                  Document Outline
                </h3>
                <Outline />
              </div>
            </div>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                customTextRenderer={textRenderer}
                scale={scale}
              />
            ))}
          </Document>
        </div>
      </div>
    </div >
  )
}

export default MyPDFViewer