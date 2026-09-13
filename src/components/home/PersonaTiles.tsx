import Link from "next/link";
import { Home, PencilRuler, HardHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHomePage } from "@/lib/data/home";
import { PersonaIcon } from "@/lib/types";

const PERSONA_ICONS: Record<PersonaIcon, typeof Home> = {
  home: Home,
  architect: PencilRuler,
  dealer: HardHat,
};

export async function PersonaTiles() {
  const { personaHeading, personas } = await getHomePage();

  return (
    <section className="bg-stone py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={personaHeading.eyebrow}
          title={personaHeading.title}
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {personas.map((p) => {
            const Icon = PERSONA_ICONS[p.icon];
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col items-start gap-4 rounded-none border border-border bg-cream p-8 transition-colors hover:border-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-none bg-accent-soft text-accent-dark">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.description}</p>
                <span className="mt-auto text-xs font-semibold uppercase tracking-[0.1em] text-accent group-hover:text-accent-dark">
                  {p.ctaLabel} →
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
