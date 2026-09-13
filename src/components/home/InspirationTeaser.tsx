import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { getPosts } from "@/lib/data/posts";
import { getHomePage } from "@/lib/data/home";

export async function InspirationTeaser() {
  const [posts, home] = await Promise.all([getPosts(), getHomePage()]);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={home.inspirationHeading.eyebrow}
            title={home.inspirationHeading.title}
          />
          <Link
            href="/inspiration"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-dark"
          >
            {home.inspirationCtaLabel} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/inspiration/${post.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-none">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                ) : (
                  <Placeholder
                    tone={post.tone}
                    label={post.room}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                )}
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
