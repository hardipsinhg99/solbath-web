"use client";

import { useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { PlaceholderTone } from "@/lib/types";

export function ProductGallery({
  tone,
  name,
}: {
  tone: PlaceholderTone;
  name: string;
}) {
  const shots = ["Front View", "Angle View", "Installed", "Detail"];
  const [active, setActive] = useState(0);

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
