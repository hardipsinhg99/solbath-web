"use client";

import { useState } from "react";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { PlaceholderTone } from "@/lib/types";

export function ProductGallery({
  tone,
  name,
  images,
}: {
  tone: PlaceholderTone;
  name: string;
  images?: string[];
}) {
  const [active, setActive] = useState(0);

  if (images && images.length > 0) {
    return (
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-white">
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
        {images.length > 1 ? (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${name}`}
                className={`relative aspect-square overflow-hidden rounded-none border-2 bg-white transition-colors ${
                  active === i ? "border-accent" : "border-transparent"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-contain" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  const shots = ["Front View", "Angle View", "Installed", "Detail"];

  return (
    <div>
      <div className="aspect-[4/5] overflow-hidden rounded-none">
        <Placeholder tone={tone} label={`${name} — ${shots[active]}`} className="h-full w-full" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {shots.map((shot, i) => (
          <button
            key={shot}
            onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden rounded-none border-2 transition-colors ${
              active === i ? "border-accent" : "border-transparent"
            }`}
          >
            <Placeholder tone={tone} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
