import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={clsx(
            "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
            tone === "light" ? "text-accent" : "text-accent-soft",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={clsx(
          "font-heading text-3xl leading-tight text-balance sm:text-4xl",
          tone === "light" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed",
            tone === "light" ? "text-ink-soft" : "text-white/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
