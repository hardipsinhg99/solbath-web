"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";

export function CatalogDownloadButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 3000);
      }}
      className="flex items-center gap-2 rounded-none border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
    >
      {clicked ? (
        <>
          <Check size={15} className="text-success" /> Available after CMS setup
        </>
      ) : (
        <>
          <Download size={15} /> Download PDF
        </>
      )}
    </button>
  );
}
