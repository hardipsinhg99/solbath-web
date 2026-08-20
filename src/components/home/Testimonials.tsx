import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/data/testimonials";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-navy py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Trusted by homeowners & trade partners"
          title="What people say about SolBath"
          align="center"
          tone="dark"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col gap-4 rounded-none border border-white/10 bg-white/5 p-6">
              <div className="flex gap-0.5 text-accent-soft">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.round(t.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/50">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
