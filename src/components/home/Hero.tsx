import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        tabIndex={-1}
      >
        <source src="/Luxury_cinematic_website_hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/28 to-black/0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-black/8 to-black/0" />

      <Container className="relative flex min-h-[78vh] flex-col items-start justify-end gap-6 py-20 sm:min-h-[85vh]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
          The 2026 Collection
        </p>
        <h1 className="max-w-2xl font-heading text-4xl leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
          Fittings, surfaces, hardware and kitchens for spaces built to last
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/70">
          Explore SolBath&apos;s complete range of bathroom accessories, ceramic tiles,
          hardware and kitchen solutions - curated for architects, dealers and homeowners
          who want more from every surface.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/bathroom-accessories" size="lg">
            Explore the Catalog
          </Button>
          <Button href="/quote" variant="outline-light" size="lg">
            Request a Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}
