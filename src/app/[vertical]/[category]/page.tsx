import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { verticalMeta, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { CategoryProductBrowser } from "@/components/product/CategoryProductBrowser";

export async function generateMetadata({ params }: PageProps<"/[vertical]/[category]">) {
  const { vertical, category } = await params;
  const cat = getCategory(vertical, category);
  if (!cat) return {};
  return { title: cat.name, description: cat.tagline };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[vertical]/[category]">) {
  const { vertical, category } = await params;
  const meta = verticalMeta[vertical];
  const cat = getCategory(vertical, category);
  if (!meta || !cat) notFound();

  const products = getProductsByCategory(vertical, category);

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <p className="text-xs font-medium text-ink-soft">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>{" "}
          /{" "}
          <Link href={`/${vertical}`} className="hover:text-accent">
            {meta.name}
          </Link>{" "}
          / {cat.name}
        </p>

        <div className="mt-4 max-w-2xl">
          <h1 className="font-heading text-3xl text-ink sm:text-4xl">{cat.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">{cat.description}</p>
        </div>

        <div className="mt-10">
          <CategoryProductBrowser category={cat} products={products} />
        </div>
      </Container>
    </div>
  );
}
