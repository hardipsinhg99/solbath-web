"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data/site";
import { useSelection } from "@/components/selection-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getCategoriesByVertical, verticalMeta } from "@/lib/data/categories";
import { getProductsByVertical } from "@/lib/data/products";
import { Vertical } from "@/lib/types";

const mainNav = site.nav.filter((item) => item.href !== "/dealers");
const verticalNav = mainNav.filter((item) =>
  ["bathroom-accessories", "ceramic-tiles", "hardware"].includes(item.href.slice(1)),
);
const secondaryNav = mainNav.filter((item) => !verticalNav.includes(item));

const verticalImages: Record<Vertical, { src: string; alt: string }> = {
  "bathroom-accessories": {
    src: "/images/generated/menu-bathroom-accessories.png",
    alt: "Premium bathroom faucet and basin detail",
  },
  "ceramic-tiles": {
    src: "/images/generated/menu-ceramic-tiles.png",
    alt: "Large-format ceramic tile surface detail",
  },
  hardware: {
    src: "/images/generated/menu-hardware.png",
    alt: "Premium brushed metal hardware detail",
  },
};

function navLinkClass(active: boolean) {
  return `group/nav relative flex items-center gap-1.5 whitespace-nowrap rounded-none px-3.5 py-2.5 text-[12px] font-medium uppercase leading-none tracking-[0.11em] transition-all duration-200 after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:-translate-y-px hover:after:scale-x-100 ${
    active
      ? "bg-accent-soft/90 text-accent-dark shadow-[inset_0_0_0_1px_rgba(30,111,217,0.14)] after:scale-x-100 dark:bg-white/[0.09] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-ink-soft hover:bg-white/80 hover:text-ink hover:shadow-[0_10px_24px_rgba(16,25,43,0.07)] dark:text-white/68 dark:hover:bg-white/[0.08] dark:hover:text-white dark:hover:shadow-none"
  }`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>("bathroom-accessories");
  const pathname = usePathname();
  const { items } = useSelection();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-0 z-50 border-b border-white/60 bg-white/72 text-ink shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-navy/78 dark:text-white">
      <div className="hidden border-b border-border/60 bg-white/35 lg:block dark:border-white/10 dark:bg-white/[0.03]">
        <Container className="flex items-center justify-between py-2 text-[12px] text-ink-soft dark:text-white/65">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-1.5 transition-colors hover:text-accent-dark dark:hover:text-white"
          >
            <Phone size={13} strokeWidth={1.75} />
            {site.phone}
          </a>
          <div className="flex items-center gap-5">
            <Link
              href="/dealers"
              className="flex items-center gap-1.5 transition-colors hover:text-accent-dark dark:hover:text-white"
            >
              <MapPin size={13} strokeWidth={1.75} />
              Find a Dealer
            </Link>
            <ThemeToggle className="h-7 w-7 text-ink-soft hover:bg-accent-soft hover:text-accent-dark dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white" />
          </div>
        </Container>
      </div>

      <header>
        <Container className="flex items-center justify-between gap-5 py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-light-trimmed.png"
              alt="SolBath Global Private Limited"
              width={461}
              height={129}
              priority
              className="h-11 w-auto object-contain sm:h-12 dark:hidden"
            />
            <Image
              src="/logo.png"
              alt="SolBath Global Private Limited"
              width={460}
              height={127}
              priority
              className="hidden h-11 w-auto object-contain dark:block dark:sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1.5 xl:flex">
            {verticalNav.map((item) => {
              const vertical = item.href.slice(1) as Vertical;
              const meta = verticalMeta[vertical];
              const menuImage = verticalImages[vertical];
              const categories = getCategoriesByVertical(vertical);
              const popular = getProductsByVertical(vertical)
                .filter((product) => product.featured || product.isNew)
                .slice(0, 3);

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={navLinkClass(isActive(item.href))}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:rotate-180 group-hover/nav:text-accent-dark dark:group-hover/nav:text-white"
                    />
                  </Link>

                  <div className="invisible absolute left-1/2 top-full w-[min(790px,calc(100vw-48px))] -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-none border border-border bg-white shadow-[0_30px_80px_rgba(16,25,43,0.24)] dark:border-white/10 dark:bg-[#071423] dark:shadow-[0_30px_80px_rgba(0,0,0,0.52)]">
                      <div className="grid grid-cols-[1fr_1.25fr]">
                        <div className="group/media relative min-h-[260px] overflow-hidden border-r border-border/80 bg-navy p-5 text-white dark:border-white/10">
                          <Image
                            src={menuImage.src}
                            alt={menuImage.alt}
                            fill
                            sizes="360px"
                            className="object-cover transition-[transform,filter] duration-700 ease-out group-hover/media:scale-[1.055] group-hover/media:saturate-[1.08]"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,20,35,0.92)_0%,rgba(7,20,35,0.76)_42%,rgba(7,20,35,0.28)_100%)] transition-opacity duration-500 group-hover/media:opacity-95" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(76,159,236,0.24),transparent_38%)] transition-transform duration-700 ease-out group-hover/media:translate-x-2 group-hover/media:scale-110" />

                          <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                            <div className="transition-transform duration-500 ease-out group-hover/media:-translate-y-1">
                              <p className="font-heading text-[24px] leading-tight text-white">
                                {meta.name}
                              </p>
                              <p className="mt-2 max-w-[250px] text-sm leading-relaxed text-white/74">
                                {meta.tagline}
                              </p>
                            </div>
                            <Link
                              href={item.href}
                              className="inline-flex w-fit items-center gap-1.5 rounded-none bg-accent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-px hover:bg-accent-dark"
                            >
                              View complete range <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 p-5">
                          <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-white/55">
                              Shop by category
                            </p>
                            <div className="grid gap-1">
                              {categories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/${vertical}/${category.slug}`}
                                  className="group/item rounded-none px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone hover:shadow-[0_12px_26px_rgba(16,25,43,0.08)] dark:hover:bg-white/[0.08] dark:hover:shadow-none"
                                >
                                  <span className="flex items-center justify-between gap-3 text-[14px] font-semibold tracking-[0.01em] text-ink dark:text-white">
                                    {category.name}
                                    <ArrowUpRight
                                      size={13}
                                      className="translate-x-[-3px] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                    />
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft dark:text-white/55">
                                    {category.tagline}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-white/55">
                              Popular picks
                            </p>
                            <div className="grid gap-1">
                              {popular.map((product) => (
                                <Link
                                  key={product.slug}
                                  href={`/product/${product.slug}`}
                                  className="group/item rounded-none px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-stone hover:shadow-[0_12px_26px_rgba(16,25,43,0.08)] dark:hover:bg-white/[0.08] dark:hover:shadow-none"
                                >
                                  <span className="block text-[14px] font-semibold leading-snug tracking-[0.01em] text-ink dark:text-white">
                                    {product.name}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-accent dark:text-white/60">
                                    {product.collection}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              href="/selection"
              className="relative flex items-center gap-2 whitespace-nowrap rounded-none px-3.5 py-2.5 text-[13px] font-medium tracking-[0.01em] text-ink-soft transition-all duration-200 hover:-translate-y-px hover:bg-stone hover:text-accent-dark hover:shadow-[0_10px_24px_rgba(16,25,43,0.07)] dark:text-white/75 dark:hover:bg-white/[0.08] dark:hover:text-white dark:hover:shadow-none"
            >
              <ClipboardList size={18} strokeWidth={1.75} />
              My Selection
              {items.length > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-none bg-accent px-1 text-[10px] font-semibold text-white shadow-sm">
                  {items.length}
                </span>
              ) : null}
            </Link>
            <Link
              href="/quote"
              className="whitespace-nowrap rounded-none bg-accent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.11em] text-white shadow-[0_14px_30px_rgba(14,44,78,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-dark"
            >
              Request a Quote
            </Link>
          </div>

          <div className="flex items-center gap-1 xl:hidden">
            <Link
              href="/selection"
              aria-label="My Selection"
              className="relative flex h-10 w-10 items-center justify-center rounded-none text-ink-soft hover:bg-stone hover:text-accent-dark dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              onClick={() => setOpen(false)}
            >
              <ClipboardList size={18} strokeWidth={1.75} />
              {items.length > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-none bg-accent px-1 text-[9px] font-semibold text-white">
                  {items.length}
                </span>
              ) : null}
            </Link>
            <ThemeToggle className="text-ink-soft hover:bg-stone hover:text-accent-dark dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" />
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-none bg-accent text-white transition-colors hover:bg-accent-dark"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </Container>

        {open ? (
          <div className="border-t border-border bg-white/95 shadow-xl backdrop-blur-2xl xl:hidden dark:border-white/10 dark:bg-navy/95">
            <Container className="flex max-h-[calc(100vh-76px)] flex-col gap-3 overflow-y-auto py-4">
              {verticalNav.map((item) => {
                const vertical = item.href.slice(1) as Vertical;
                const meta = verticalMeta[vertical];
                const menuImage = verticalImages[vertical];
                const categories = getCategoriesByVertical(vertical);
                const expanded = openMobileGroup === vertical;

                return (
                  <div
                    key={item.href}
                    className="group/mobile overflow-hidden rounded-none border border-border bg-white shadow-[0_12px_28px_rgba(16,25,43,0.10)] dark:border-white/10 dark:bg-[#071423] dark:shadow-none"
                  >
                    <button
                      type="button"
                      className="relative flex min-h-[112px] w-full items-end justify-between gap-3 overflow-hidden px-4 py-4 text-left text-white"
                      aria-expanded={expanded}
                      onClick={() => setOpenMobileGroup(expanded ? null : vertical)}
                    >
                      <Image
                        src={menuImage.src}
                        alt={menuImage.alt}
                        fill
                        sizes="(max-width: 1279px) 100vw"
                        className="object-cover transition-[transform,filter] duration-700 ease-out group-hover/mobile:scale-[1.04] group-hover/mobile:saturate-[1.08]"
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,20,35,0.92)_0%,rgba(7,20,35,0.72)_56%,rgba(7,20,35,0.34)_100%)] transition-opacity duration-500 group-hover/mobile:opacity-95" />
                      <span className="relative z-10 flex items-end gap-3 transition-transform duration-500 ease-out group-hover/mobile:-translate-y-0.5">
                        <span>
                          <span className="block text-base font-semibold tracking-[0.01em] text-white">
                            {meta.name}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-white/70">
                            {meta.tagline}
                          </span>
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`relative z-10 shrink-0 text-white/75 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expanded ? (
                      <div className="border-t border-border bg-white p-2 dark:border-white/10 dark:bg-[#071423]">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="mb-1 flex items-center justify-between rounded-none px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent hover:bg-stone dark:text-white/85 dark:hover:bg-white/10"
                        >
                          View all {meta.name}
                          <ArrowUpRight size={14} />
                        </Link>
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/${vertical}/${category.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-none px-3 py-2.5 transition-colors hover:bg-stone dark:hover:bg-white/10"
                          >
                            <span className="block text-sm font-semibold tracking-[0.01em] text-ink dark:text-white">
                              {category.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-ink-soft dark:text-white/55">
                              {category.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              <div className="grid gap-2">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-none px-4 py-3 text-sm font-semibold tracking-[0.01em] transition-colors ${
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-dark dark:bg-white/10 dark:text-white"
                        : "text-ink hover:bg-stone hover:text-accent-dark dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/dealers"
                  onClick={() => setOpen(false)}
                  className={`rounded-none px-4 py-3 text-sm font-semibold tracking-[0.01em] transition-colors ${
                    isActive("/dealers")
                      ? "bg-accent-soft text-accent-dark dark:bg-white/10 dark:text-white"
                      : "text-ink hover:bg-stone hover:text-accent-dark dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  Find a Dealer
                </Link>
              </div>

              <div className="mt-1 grid gap-2 rounded-none border border-border bg-stone/50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
                <a
                  href={`tel:${site.phone}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-none px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white hover:text-accent-dark dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Phone size={16} /> {site.phone}
                </a>
                <Link
                  href="/selection"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-none px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white hover:text-accent-dark dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <ClipboardList size={16} /> My Selection {items.length > 0 ? `(${items.length})` : ""}
                </Link>
              </div>
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-none bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
              >
                Request a Quote
              </Link>
            </Container>
          </div>
        ) : null}
      </header>
    </div>
  );
}
