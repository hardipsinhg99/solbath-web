"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { FlipbookViewer } from "./FlipbookViewer";

export function CatalogViewButton({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-none border border-navy bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        <BookOpen size={15} /> View Catalogue
      </button>
      {open ? <FlipbookViewer pdfUrl={pdfUrl} title={title} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
