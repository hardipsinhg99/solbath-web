import { MapPin, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-6 rounded-none bg-stone p-10">
          <div>
            <MapPin size={28} strokeWidth={1.5} className="text-accent" />
            <h3 className="mt-4 font-heading text-2xl text-ink">Visit a showroom near you</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              See finishes, textures and full room setups in person at one of our partner
              showrooms across Gujarat and Maharashtra.
            </p>
          </div>
          <Button href="/dealers" className="self-start">
            Find a Dealer
          </Button>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-none bg-navy p-10 text-white">
          <div>
            <Download size={28} strokeWidth={1.5} className="text-accent-soft" />
            <h3 className="mt-4 font-heading text-2xl">Download our catalogues</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Get the full product range, specs and finishes in one PDF — organized by
              category for faster specification.
            </p>
          </div>
          <Button href="/catalogues" variant="secondary" className="self-start">
            Browse Catalogues
          </Button>
        </div>
      </Container>
    </section>
  );
}
