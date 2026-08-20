"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSelection } from "@/components/selection-context";
import { whatsappLink } from "@/lib/data/site";

export function SelectionList() {
  const { items, remove, clear } = useSelection();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-none border border-dashed border-border py-20 text-center">
        <ClipboardList size={32} className="text-ink-soft" />
        <p className="text-ink-soft">
          Your selection is empty. Browse the catalog and tap &ldquo;Add to My Selection&rdquo;
          on any product.
        </p>
        <Button href="/kitchen" variant="ghost">
          Browse Products
        </Button>
      </div>
    );
  }

  const summaryText = [
    "Hi SolBath, I'd like a quote for the following products:",
    ...items.map((i) => `- ${i.name} (${i.collection})`),
  ].join("\n");

  return (
    <div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center justify-between gap-4 rounded-none border border-border px-5 py-4"
          >
            <div>
              <Link href={`/product/${item.slug}`} className="font-medium text-ink hover:text-accent-dark">
                {item.name}
              </Link>
              <p className="text-xs text-ink-soft">{item.collection}</p>
            </div>
            <button
              onClick={() => remove(item.slug)}
              aria-label={`Remove ${item.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-none text-ink-soft hover:bg-stone hover:text-error"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button href="/quote" size="lg">
          Proceed to Quote Request
        </Button>
        <a
          href={whatsappLink(summaryText)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-success hover:text-success/80"
        >
          <Image src="/whatsapp-current.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
          Share via WhatsApp
        </a>
        <button onClick={clear} className="text-sm text-ink-soft hover:text-error">
          Clear Selection
        </button>
      </div>
    </div>
  );
}
