"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";

const PAGE_RENDER_SCALE = 1.4;

interface FlipbookViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

// Space reserved for the modal's own chrome (header + footer bars + breathing room)
// when fitting the book into the viewport.
const CONTENT_PADDING_Y = 48;
const ARROW_GUTTER_X = 140;
const TWO_PAGE_MIN_WIDTH = 700;

export function FlipbookViewer({ pdfUrl, title, onClose }: FlipbookViewerProps) {
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [muted, setMuted] = useState(false);
  const [pageAspect, setPageAspect] = useState(1.414); // height / width, A4 default until the PDF loads
  const [bookSize, setBookSize] = useState({ width: 420, height: 594 });
  const [spread, setSpread] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // react-pageflip's ref exposes an imperative pageFlip() controller not covered by its own types.
  const flipBookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } } | null>(
    null,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/page-flip.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  // Fit the book exactly inside the visible content area, preserving the PDF's
  // real aspect ratio, instead of letting react-pageflip's own "stretch" sizing
  // guess a height that can overflow the container and get clipped.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const recompute = () => {
      const availableWidth = Math.max(200, el.clientWidth - ARROW_GUTTER_X);
      const availableHeight = Math.max(200, el.clientHeight - CONTENT_PADDING_Y);
      const twoPage = availableWidth >= TWO_PAGE_MIN_WIDTH;

      let singleWidth = twoPage ? availableWidth / 2 : availableWidth;
      let singleHeight = singleWidth * pageAspect;
      if (singleHeight > availableHeight) {
        singleHeight = availableHeight;
        singleWidth = singleHeight / pageAspect;
      }

      setBookSize({ width: Math.round(singleWidth), height: Math.round(singleHeight) });
      setSpread(twoPage);
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pageAspect]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const doc = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        if (cancelled) return;

        const firstPage = await doc.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1 });
        setPageAspect(viewport.height / viewport.width);

        setPageImages(new Array(doc.numPages).fill(""));
        setLoading(false);

        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const pageViewport = page.getViewport({ scale: PAGE_RENDER_SCALE });
          const canvas = document.createElement("canvas");
          canvas.width = pageViewport.width;
          canvas.height = pageViewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          await page.render({ canvas, canvasContext: ctx, viewport: pageViewport }).promise;
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          if (cancelled) return;

          setPageImages((prev) => {
            const next = [...prev];
            next[i - 1] = dataUrl;
            return next;
          });
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Couldn't load this catalogue. Please try again.");
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const playFlipSound = useCallback(() => {
    if (muted || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    void audioRef.current.play().catch(() => {});
  }, [muted]);

  const goPrev = () => flipBookRef.current?.pageFlip().flipPrev();
  const goNext = () => flipBookRef.current?.pageFlip().flipNext();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/60">
            Catalogue Preview
          </p>
          <h2 className="font-heading text-lg text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute page flip sound" : "Mute page flip sound"}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-none text-white/70 hover:bg-white/10 hover:text-white"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close catalogue preview"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-none text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div ref={contentRef} className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
        {error ? (
          <p className="text-sm text-white/80">{error}</p>
        ) : loading ? (
          <p className="text-sm text-white/70">Loading catalogue…</p>
        ) : (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous page"
              className="absolute left-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-none bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>

            <div
              className="relative shadow-2xl"
              style={{
                width: spread ? bookSize.width * 2 : bookSize.width,
                height: bookSize.height,
              }}
            >
              <HTMLFlipBook
                key={`${bookSize.width}x${bookSize.height}x${spread}`}
                width={bookSize.width}
                height={bookSize.height}
                size="fixed"
                minWidth={bookSize.width}
                maxWidth={bookSize.width}
                minHeight={bookSize.height}
                maxHeight={bookSize.height}
                maxShadowOpacity={0.5}
                showCover
                mobileScrollSupport
                className=""
                style={{}}
                startPage={0}
                drawShadow
                flippingTime={550}
                usePortrait={!spread}
                startZIndex={0}
                autoSize={false}
                clickEventForward
                useMouseEvents
                swipeDistance={30}
                showPageCorners
                disableFlipByClick={false}
                onFlip={(e) => {
                  setCurrentPage(e.data);
                  playFlipSound();
                }}
                ref={flipBookRef}
              >
                {pageImages.map((src, i) => (
                  <div key={i} className="flex items-center justify-center bg-white">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element -- data URLs from client-rendered PDF canvases aren't optimizable by next/image
                      <img
                        src={src}
                        alt={`Page ${i + 1}`}
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone text-xs text-ink-soft">
                        Page {i + 1}
                      </div>
                    )}
                  </div>
                ))}
              </HTMLFlipBook>

              {/* Static centre-spine shadow, like the valley of a real open book */}
              {spread ? (
                <div
                  className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: Math.max(24, bookSize.width * 0.08),
                    background:
                      "linear-gradient(to right, transparent, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.28) 55%, transparent)",
                  }}
                />
              ) : null}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next page"
              className="absolute right-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-none bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {!loading && !error ? (
        <div className="border-t border-white/10 px-5 py-3 text-center text-xs text-white/60">
          Page {currentPage + 1} of {pageImages.length}
        </div>
      ) : null}
    </div>
  );
}
