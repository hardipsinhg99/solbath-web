import { ShieldCheck, Truck, Award, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getHomePage } from "@/lib/data/home";
import { StatIcon } from "@/lib/types";

const STAT_ICONS: Record<StatIcon, typeof Award> = {
  award: Award,
  users: Users,
  shield: ShieldCheck,
  truck: Truck,
};

export async function TrustStrip() {
  const { trustStats } = await getHomePage();

  return (
    <section className="border-y border-border bg-cream py-12">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {trustStats.map((s) => {
          const Icon = STAT_ICONS[s.icon];
          return (
            <div key={s.label} className="flex items-center gap-3">
              <Icon size={26} strokeWidth={1.5} className="shrink-0 text-accent" />
              <div>
                <p className="font-heading text-lg text-ink">{s.label}</p>
                <p className="text-xs text-ink-soft">{s.detail}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
