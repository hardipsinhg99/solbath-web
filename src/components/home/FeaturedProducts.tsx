import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts, getProductsBySlugs } from "@/lib/data/products";
import { getHomePage } from "@/lib/data/home";

export async function FeaturedProducts() {
  const home = await getHomePage();
  const featured = home.featuredProductSlugs.length
    ? await getProductsBySlugs(home.featuredProductSlugs)
    : await getFeaturedProducts();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={home.featuredProductsHeading.eyebrow}
            title={home.featuredProductsHeading.title}
          />
          <Button href={home.featuredProductsCtaHref} variant="ghost">
            {home.featuredProductsCtaLabel}
          </Button>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
