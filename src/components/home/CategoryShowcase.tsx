import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { verticalMeta } from "@/lib/data/categories";

const items = [
  {
    ...verticalMeta["bathroom-accessories"],
    description: "Faucets, showers & sanitaryware finished to a designer standard.",
  },
  {
    ...verticalMeta["ceramic-tiles"],
    description: "Floor, wall and large-format tiles in every texture and tone.",
  },
  {
    ...verticalMeta["hardware"],
    description: "Door, cabinet and security hardware — the details that matter.",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Placeholder
                  tone={item.tone}
                  label={item.name}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-2xl text-white">{item.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/75">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                    Explore Range
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
