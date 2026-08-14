import clsx from "clsx";

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "ink" | "light";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-white",
    ink: "bg-navy text-white",
    light: "bg-white/90 text-ink",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-none px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
