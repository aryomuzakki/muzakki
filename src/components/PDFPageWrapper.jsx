import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'
import { Page } from 'react-pdf'

const PDFPageWrapper = ({
  index,
  pageNumber,
  width,
  customTextRenderer,
  scale,
  onPageLoadSuccess,
  setPagesInViewState,
  ...props
}) => {

  const [ref, inView, entry] = useInView({
    // onChange: inViewChanged,
    rootMargin: "-56px 0px 0px 0px",
  });

  useEffect(() => {
    if (entry) {
      setPagesInViewState((prevVal) => {
        const newVal = [...prevVal];
        newVal[entry.target.dataset.pageNumber - 1] = inView;
        return newVal;
      });
    }
  }, [inView]);


  return (
    <div>
      <Page
        pageNumber={pageNumber}
        width={width}
        customTextRenderer={customTextRenderer}
        scale={scale}
        onLoadSuccess={onPageLoadSuccess}
        inputRef={ref}
        {...props}
      />
    </div>
  )
}

export default PDFPageWrapper