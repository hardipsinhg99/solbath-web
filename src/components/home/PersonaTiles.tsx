import Link from "next/link";
import { Home, PencilRuler, HardHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const personas = [
  {
    icon: Home,
    title: "I'm a Homeowner",
    description: "Browse by room, get inspired and request a quote for your renovation.",
    href: "/quote?persona=homeowner",
    cta: "Start Planning",
  },
  {
    icon: PencilRuler,
    title: "I'm an Architect / Designer",
    description: "Technical specs, downloadable data sheets and project-scale quoting.",
    href: "/for-trade?persona=architect",
    cta: "View Trade Resources",
  },
  {
    icon: HardHat,
    title: "I'm a Dealer / Contractor",
    description: "Bulk quotes, catalogues and fast turnaround for your next project.",
    href: "/for-trade?persona=dealer",
    cta: "Partner With Us",
  },
];

export function PersonaTiles() {
  return (
    <section className="bg-stone py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Tailored for you"
          title="However you build, we have a path for you"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {personas.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex flex-col items-start gap-4 rounded-none border border-border bg-cream p-8 transition-colors hover:border-accent"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-accent-soft text-accent-dark">
                <p.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{p.description}</p>
              <span className="mt-auto text-xs font-semibold uppercase tracking-[0.1em] text-accent group-hover:text-accent-dark">
                {p.cta} →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
