import Image from "next/image";
import { Droplet, Grid3x3, Hammer, Image as ImageIcon, Sparkles, Utensils } from "lucide-react";
import { PlaceholderTone } from "@/lib/types";
import clsx from "clsx";

const toneGradients: Record<PlaceholderTone, string> = {
  bath: "from-[#e9dfc9] via-[#ddcda3] to-[#c7b184]",
  tile: "from-[#e5e0d4] via-[#d3cabb] to-[#b6ab97]",
  hardware: "from-[#e2ded7] via-[#c9c0b2] to-[#a89b87]",
  kitchen: "from-[#ebe4d8] via-[#d8c7aa] to-[#9f8c70]",
  lifestyle: "from-[#efe8da] via-[#ddd0b3] to-[#c4ac83]",
  neutral: "from-[#f0ece3] via-[#e4ddcd] to-[#d3c9b3]",
  dark: "from-[#3a3527] via-[#241f16] to-[#161209]",
};

const toneIcon: Record<PlaceholderTone, typeof Droplet> = {
  bath: Droplet,
  tile: Grid3x3,
  hardware: Hammer,
  kitchen: Utensils,
  lifestyle: Sparkles,
  neutral: ImageIcon,
  dark: ImageIcon,
};

const toneImages: Record<PlaceholderTone, string> = {
  bath: "/images/generated/solbath-bath-accessories.png",
  tile: "/images/generated/solbath-ceramic-tiles.png",
  hardware: "/images/generated/solbath-hardware.png",
  kitchen: "/images/generated/solbath-kitchen.png",
  lifestyle: "/images/generated/solbath-lifestyle-kitchen.png",
  neutral: "/images/generated/solbath-showroom.png",
  dark: "/images/generated/solbath-hero-cinematic.png",
};

interface PlaceholderProps {
  tone?: PlaceholderTone;
  label?: string;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}

export function Placeholder({
  tone = "neutral",
  label,
  className,
  iconClassName,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  imageClassName,
}: PlaceholderProps) {
  const Icon = toneIcon[tone];
  const isDark = tone === "dark";
  const imageSrc = toneImages[tone];

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        toneGradients[tone],
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 14px)",
        }}
        aria-hidden
      />
      <Image
        src={imageSrc}
        alt={label ? `${label} by SolBath` : "SolBath showroom materials and fixtures"}
        fill
        priority={priority}
        sizes={sizes}
        className={clsx("absolute inset-0 h-full w-full object-cover", imageClassName)}
      />
      <div className="absolute inset-0 bg-ink/10" aria-hidden />
      <div className="relative hidden flex-col items-center gap-3 px-4 text-center">
        <div
          className={clsx(
            "flex items-center justify-center rounded-none border",
            isDark ? "border-white/25 bg-white/10" : "border-navy/15 bg-white/40",
          )}
          style={{ width: 56, height: 56 }}
        >
          <Icon
            className={clsx(isDark ? "text-white/70" : "text-ink/50", iconClassName)}
            size={24}
            strokeWidth={1.5}
          />
        </div>
        {label ? (
          <span
            className={clsx(
              "text-[11px] font-medium uppercase tracking-[0.14em]",
              isDark ? "text-white/60" : "text-ink/45",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
