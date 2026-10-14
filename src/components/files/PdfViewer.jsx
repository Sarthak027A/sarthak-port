import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ""}/pdf.worker.min.js`;

// Renders each page to a canvas only when it scrolls near the viewport, so a
// 24-page CIM opens instantly and stays light on phones. Works on every
// browser, including Android Chrome, which can't display PDFs inline.
const Page = ({ doc, number, width, root }) => {
  const holder = useRef(null);
  const canvas = useRef(null);
  const [ratio, setRatio] = useState(1.294);
  const [visible, setVisible] = useState(number === 1);

  useEffect(() => {
    if (visible) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { root, rootMargin: "800px 0px" },
    );
    io.observe(holder.current);
    return () => io.disconnect();
  }, [visible, root]);

  useEffect(() => {
    if (!visible || !width) return undefined;
    let task;
    let cancelled = false;
    doc.getPage(number).then((page) => {
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      setRatio(base.height / base.width);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      const c = canvas.current;
      c.width = viewport.width;
      c.height = viewport.height;
      task = page.render({ canvasContext: c.getContext("2d"), viewport });
      task.promise.catch(() => {});
    });
    return () => {
      cancelled = true;
      if (task) task.cancel();
    };
  }, [doc, number, visible, width]);

  return (
    <div
      ref={holder}
      className="mx-auto w-full overflow-hidden rounded-md bg-white"
      style={{ maxWidth: width, aspectRatio: `1 / ${ratio}` }}
    >
      <canvas ref={canvas} className="block h-full w-full" aria-label={`Page ${number}`} />
    </div>
  );
};

const PdfViewer = ({ src }) => {
  const scroller = useRef(null);
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const task = pdfjs.getDocument(src);
    task.promise.then(setDoc, () => setError(true));
    return () => {
      task.destroy();
    };
  }, [src]);

  useEffect(() => {
    const el = scroller.current;
    const measure = () => setWidth(Math.min(el.clientWidth - 32, 900));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={scroller} className="h-full overflow-y-auto overscroll-contain px-4 py-6" data-testid="pdf-viewer">
      {error && <p className="py-20 text-center text-sm text-[var(--ash)]">Couldn&rsquo;t load this document.</p>}
      {!doc && !error && (
        <p className="py-20 text-center font-mono text-xs text-[var(--ash)]">Loading document…</p>
      )}
      {doc && width > 0 && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: doc.numPages }, (_, i) => (
            <Page key={i} doc={doc} number={i + 1} width={width} root={scroller.current} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
