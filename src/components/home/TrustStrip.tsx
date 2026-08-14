import { ShieldCheck, Truck, Award, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";

const stats = [
  { icon: Award, label: "15+ Years", detail: "Trusted craftsmanship" },
  { icon: Users, label: "6 Showrooms", detail: "Across Gujarat & Maharashtra" },
  { icon: ShieldCheck, label: "Up to 10-Year", detail: "Product warranty" },
  { icon: Truck, label: "Pan-India", detail: "Dealer & project delivery" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-cream py-12">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <s.icon size={26} strokeWidth={1.5} className="shrink-0 text-accent" />
            <div>
              <p className="font-heading text-lg text-ink">{s.label}</p>
              <p className="text-xs text-ink-soft">{s.detail}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
