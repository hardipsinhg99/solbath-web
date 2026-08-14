import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { posts } from "@/lib/data/posts";

export function InspirationTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Inspiration"
            title="Ideas for every room, from our design desk"
          />
          <Link
            href="/inspiration"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-dark"
          >
            View All Stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/inspiration/${post.slug}`} className="group flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-none">
                <Placeholder
                  tone={post.tone}
                  label={post.room}
                  className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                {post.room} · {post.readTime}
              </p>
              <h3 className="mt-1 font-heading text-lg leading-snug text-ink group-hover:text-accent-dark">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
