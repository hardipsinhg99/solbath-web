"use client";

import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { Placeholder } from "@/components/ui/Placeholder";
import { Badge } from "@/components/ui/Badge";
import { useSelection } from "@/components/selection-context";

export function ProductCard({ product }: { product: Product }) {
  const { add, has } = useSelection();
  const added = has(product.slug);

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-none"
      >
        <Placeholder
          tone={product.tone}
          label={product.collection}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew ? <Badge tone="ink">New</Badge> : null}
          {product.tags.includes("Bestseller") ? <Badge tone="accent">Bestseller</Badge> : null}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
            {product.collection}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-heading text-lg leading-snug text-ink hover:text-accent-dark">
              {product.name}
            </h3>
          </Link>
        </div>
        <button
          type="button"
          aria-label={added ? "Added to selection" : "Add to My Selection"}
          onClick={() =>
            add({
              slug: product.slug,
              name: product.name,
              collection: product.collection,
              vertical: product.vertical,
            })
          }
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-none border transition-colors ${
            added
              ? "border-accent bg-accent text-white"
              : "border-border text-ink-soft hover:border-accent hover:text-accent"
          }`}
        >
          {added ? <Check size={15} /> : <Plus size={15} />}
        </button>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>
      {product.finishes?.length ? (
        <p className="mt-2 text-xs text-ink-soft/80">{product.finishes.join(" · ")}</p>
      ) : null}
    </div>
  );
}
