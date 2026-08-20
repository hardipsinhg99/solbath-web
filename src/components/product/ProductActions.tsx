"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSelection } from "@/components/selection-context";
import { Product } from "@/lib/types";
import { whatsappLink } from "@/lib/data/site";

export function ProductActions({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber: string;
}) {
  const [finish, setFinish] = useState(product.finishes[0]);
  const { add, has } = useSelection();
  const added = has(product.slug);

  const message = `Hi SolBath, I'm interested in the ${product.name} (${finish} finish). Could you share pricing and availability?`;

  return (
    <div className="space-y-6">
      {product.finishes.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-ink">
            Finish: <span className="text-ink-soft">{finish}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.finishes.map((f) => (
              <button
                key={f}
                onClick={() => setFinish(f)}
                className={`rounded-none border px-4 py-2 text-xs font-medium transition-colors ${
                  finish === f
                    ? "border-navy bg-navy text-white"
                    : "border-border text-ink-soft hover:border-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {product.sizes?.length ? (
        <div>
          <p className="text-sm font-medium text-ink">Available Sizes</p>
          <p className="mt-2 text-sm text-ink-soft">{product.sizes.join(" · ")}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        <Button href={`/quote?product=${product.slug}`} size="lg">
          Request a Quote
        </Button>
        <Button
          onClick={() =>
            add({
              slug: product.slug,
              name: product.name,
              collection: product.collection,
              vertical: product.vertical,
            })
          }
          variant={added ? "ghost" : "secondary"}
          size="lg"
        >
          {added ? (
            <>
              <Check size={16} /> Added to Selection
            </>
          ) : (
            <>
              <Plus size={16} /> Add to My Selection
            </>
          )}
        </Button>
      </div>

      <a
        href={whatsappLink(message, whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-medium text-success hover:text-success/80"
      >
        <Image src="/whatsapp-current.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
        Ask about this on WhatsApp
      </a>

      <Link
        href="/dealers"
        className="block text-sm text-ink-soft underline decoration-border underline-offset-4 hover:text-accent"
      >
        Find a dealer near you who stocks this product →
      </Link>
    </div>
  );
}
