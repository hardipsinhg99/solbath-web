"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { getCategoriesByVertical, verticalMeta } from "@/lib/data/categories";
import { getProductsByVertical } from "@/lib/data/products";
import { Vertical } from "@/lib/types";

interface ProductsMegaMenuProps {
  items: { href: string; label: string }[];
  images: Record<Vertical, { src: string; alt: string }>;
  triggerClassName: string;
}

const EASE = "power3.out";

export function ProductsMegaMenu({ items, images, triggerClassName }: ProductsMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const calculateExpandedHeight = () => {
    const panelEl = panelRef.current;
    if (!panelEl) return 0;
    const previousHeight = panelEl.style.height;
    panelEl.style.height = "auto";
    const fullHeight = panelEl.scrollHeight;
    panelEl.style.height = previousHeight;
    return fullHeight;
  };

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const headerEl = groupRef.current?.closest("header");

    const alignToHeader = () => {
      if (!wrapperEl || !headerEl) return;
      wrapperEl.style.top = `${headerEl.getBoundingClientRect().bottom}px`;
    };

    alignToHeader();
    window.addEventListener("resize", alignToHeader);
    return () => window.removeEventListener("resize", alignToHeader);
  }, []);

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current;
    const panelEl = panelRef.current;
    const topBarEl = topBarRef.current;
    if (!wrapperEl || !panelEl || !topBarEl) return;

    gsap.set(wrapperEl, { autoAlpha: 0, y: 14 });
    gsap.set(panelEl, { height: topBarEl.offsetHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 28, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(wrapperEl, { autoAlpha: 1, y: 0, duration: 0.3, ease: EASE }, 0);
    tl.to(panelEl, { height: calculateExpandedHeight, duration: 0.45, ease: EASE }, 0.05);
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: EASE, stagger: 0.07 },
      0.18,
    );
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [items]);

  const openMenu = () => {
    setOpen(true);
    tlRef.current?.play();
  };

  const closeMenu = () => {
    setOpen(false);
    tlRef.current?.reverse();
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!groupRef.current?.contains(event.relatedTarget as Node | null)) {
      closeMenu();
    }
  };

  return (
    <div
      ref={groupRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={`${triggerClassName} cursor-pointer`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Products
        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-accent-dark dark:text-white" : ""}`}
        />
      </button>

      <div
        ref={wrapperRef}
        className="fixed left-1/2 w-[min(1120px,calc(100vw-48px))] -translate-x-1/2"
      >
        <div
          ref={panelRef}
          className="overflow-hidden rounded-none border border-border/90 bg-white shadow-[0_34px_90px_rgba(16,25,43,0.24)] ring-1 ring-white/80 dark:border-white/10 dark:bg-[#071423] dark:ring-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.52)]"
        >
          <div
            ref={topBarRef}
            className="flex items-center justify-between border-b border-border bg-stone/45 px-5 py-3 dark:border-white/10 dark:bg-white/[0.035]"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-dark dark:text-white/66">
                Product Library
              </p>
              <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
                Browse complete ranges by room, surface and detail.
              </p>
            </div>
            <Link
              href="/catalogues"
              className="flex items-center gap-1.5 rounded-none border border-border bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft transition-all hover:-translate-y-px hover:border-accent hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75 dark:hover:text-white"
            >
              Catalogues <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-px">
            {items.map((item, index) => {
              const vertical = item.href.slice(1) as Vertical;
              const meta = verticalMeta[vertical];
              const menuImage = images[vertical];
              const categories = getCategoriesByVertical(vertical);
              const popular = getProductsByVertical(vertical)
                .filter((product) => product.featured || product.isNew)
                .slice(0, 2);

              return (
                <div
                  key={item.href}
                  ref={setCardRef(index)}
                  className="bg-white p-4 transition-colors hover:bg-stone/40 dark:bg-[#071423] dark:hover:bg-white/[0.035]"
                >
                  <Link
                    href={item.href}
                    className="group/media relative block h-36 overflow-hidden bg-navy text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Image
                      src={menuImage.src}
                      alt={menuImage.alt}
                      fill
                      sizes="260px"
                      className="object-cover transition-[transform,filter] duration-700 ease-out group-hover/media:scale-[1.055] group-hover/media:saturate-[1.08]"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,20,35,0.92)_0%,rgba(7,20,35,0.62)_52%,rgba(7,20,35,0.24)_100%)]" />
                    <span className="relative z-10 flex h-full flex-col justify-end p-4">
                      <span className="font-heading text-[20px] leading-tight text-white">
                        {meta.name}
                      </span>
                      <span className="mt-1.5 text-xs leading-relaxed text-white/72">
                        {meta.tagline}
                      </span>
                    </span>
                  </Link>

                  <div className="mt-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-white/55">
                      Shop by category
                    </p>
                    <div className="grid gap-1">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/${vertical}/${category.slug}`}
                          className="group/item rounded-none px-2 py-2 transition-all duration-300 ease-out hover:bg-white hover:shadow-[inset_2px_0_0_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-white/[0.08]"
                        >
                          <span className="flex items-center justify-between gap-2 text-[13px] font-semibold leading-snug tracking-[0.01em] text-ink dark:text-white">
                            {category.name}
                            <ArrowUpRight
                              size={12}
                              className="translate-x-[-3px] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {popular.length > 0 ? (
                    <div className="mt-4 border-t border-border pt-3 dark:border-white/10">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-white/55">
                        Popular
                      </p>
                      <div className="grid gap-1">
                        {popular.map((product) => (
                          <Link
                            key={product.slug}
                            href={`/product/${product.slug}`}
                            className="block rounded-none px-2 py-1.5 text-[12px] font-medium leading-snug text-ink-soft transition-colors hover:bg-white hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
