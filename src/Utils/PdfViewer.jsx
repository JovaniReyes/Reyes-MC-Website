import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import pdfFile   from '../images/PDF/ResearchPaperView.pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../Styles/PdfViewer.scss';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewerResponsive() {
  /* pagination --------------------------------------------------------- */
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPage]   = useState(1);
  const [docProxy, setDocProxy] = useState(null);

  /* wrapper size & zoom ------------------------------------------------ */
  const wrapperRef = useRef(null);
  const [wrapperW, setWrapperW] = useState(0);
  const [zoom, setZoom]         = useState(1);   // updated automatically

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setWrapperW(w);

      /* device presets: phone 2×, iPad 1.5×, desktop 1× */
      if (w <= 480)       setZoom(2);
      else if (w <= 1024) setZoom(1.5); 
      else                setZoom(1);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => {
    // cleanup function runs when component is removed from the DOM
    if (docProxy) docProxy.destroy();
  }, [docProxy]);

  /* helpers ------------------------------------------------------------ */
  const next = () => setPage(p => Math.min(p + 1, numPages));
  const prev = () => setPage(p => Math.max(p - 1, 1));

  /* width we give to <Page> */
  const renderWidth = Math.round(wrapperW * zoom);

  return (
    <div className="pdf-viewer"> 
        <div style={{color: "white"}} className="pdf-wrapper" ref={wrapperRef}>
        <Document file={pdfFile}
        externalLinkTarget="_blank"
        externalLinkRel="noopener noreferrer" 
        onLoadSuccess={(pdf) => {setDocProxy(pdf); setNumPages(pdf.numPages); setPage(1); }}>
            {wrapperW > 0 && (
            <Page
                pageNumber={pageNumber}
                width={renderWidth}        /* wider than modal on phones → horizontal scroll */
                renderTextLayer={false}
                className="pdf-page"
            />
            )}
        </Document>
        </div>
        <div className="pdf-controls">
            <button onClick={prev} disabled={pageNumber <= 1}>{"<"} Prev</button>
            <span style={{color: "white"}}>{pageNumber} / {numPages ?? '…'}</span>
            <button onClick={next} disabled={pageNumber >= numPages}>Next {">"}</button>
        </div>
    </div>
  );
}
