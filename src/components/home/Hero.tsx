import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getHomePage } from "@/lib/data/home";

const FALLBACK_VIDEO_URL = "/Luxury_cinematic_website_hero.mp4";

export async function Hero() {
  const home = await getHomePage();

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
        <source src={home.heroVideoUrl ?? FALLBACK_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/28 to-black/0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-black/8 to-black/0" />

      <Container className="relative flex min-h-[78vh] flex-col items-start justify-end gap-6 py-20 sm:min-h-[85vh]">
        {home.heroEyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
            {home.heroEyebrow}
          </p>
        ) : null}
        <h1 className="max-w-2xl font-heading text-4xl leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
          {home.heroHeading}
        </h1>
        {home.heroSubheading ? (
          <p className="max-w-xl text-base leading-relaxed text-white/70">
            {home.heroSubheading}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-4">
          {home.heroPrimaryCtaLabel ? (
            <Button href={home.heroPrimaryCtaHref} size="lg">
              {home.heroPrimaryCtaLabel}
            </Button>
          ) : null}
          {home.heroSecondaryCtaLabel ? (
            <Button href={home.heroSecondaryCtaHref} variant="outline-light" size="lg">
              {home.heroSecondaryCtaLabel}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
