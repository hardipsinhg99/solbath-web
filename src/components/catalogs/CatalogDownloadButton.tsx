"use client";

import { Download } from "lucide-react";

export function CatalogDownloadButton({
  fileUrl,
  title,
}: {
  fileUrl?: string;
  title: string;
}) {
  if (!fileUrl) {
    return (
      <button
        type="button"
        disabled
        className="flex cursor-not-allowed items-center gap-2 rounded-none border border-border bg-stone px-4 py-2.5 text-sm font-medium text-ink-soft"
      >
        <Download size={15} /> Pending upload
      </button>
    );
  }

  return (
    <a
      href={fileUrl}
      download
      aria-label={`Download ${title} catalogue PDF`}
      className="flex items-center gap-2 rounded-none border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
    >
      <Download size={15} /> Download PDF
    </a>
  );
}
