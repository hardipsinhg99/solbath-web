import { MapPin, Download } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getHomePage } from "@/lib/data/home";
import { CtaCardIcon, CtaCardVariant } from "@/lib/types";

const CTA_ICONS: Record<CtaCardIcon, typeof MapPin> = {
  "map-pin": MapPin,
  download: Download,
};

const VARIANT_STYLES: Record<
  CtaCardVariant,
  {
    section: string;
    icon: string;
    heading: string;
    description: string;
    buttonVariant: "primary" | "secondary";
  }
> = {
  light: {
    section: "bg-stone",
    icon: "text-accent",
    heading: "text-ink",
    description: "text-ink-soft",
    buttonVariant: "primary",
  },
  dark: {
    section: "bg-navy text-white",
    icon: "text-accent-soft",
    heading: "",
    description: "text-white/70",
    buttonVariant: "secondary",
  },
};

export async function CtaBand() {
  const { ctaCards } = await getHomePage();

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-6 lg:grid-cols-2">
        {ctaCards.map((card) => {
          const Icon = CTA_ICONS[card.icon];
          const styles = VARIANT_STYLES[card.variant];
          return (
            <div
              key={card.heading}
              className={clsx(
                "flex flex-col justify-between gap-6 rounded-none p-10",
                styles.section,
              )}
            >
              <div>
                <Icon size={28} strokeWidth={1.5} className={styles.icon} />
                <h3 className={clsx("mt-4 font-heading text-2xl", styles.heading)}>
                  {card.heading}
                </h3>
                <p className={clsx("mt-3 max-w-sm text-sm leading-relaxed", styles.description)}>
                  {card.description}
                </p>
              </div>
              <Button href={card.ctaHref} variant={styles.buttonVariant} className="self-start">
                {card.ctaLabel}
              </Button>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
