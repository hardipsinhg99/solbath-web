"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useSelection } from "@/components/selection-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProductsMegaMenu, type MegaMenuVerticalItem } from "./ProductsMegaMenu";

export type { MegaMenuVerticalItem };

function navLinkClass(active: boolean) {
  return `group/nav relative flex items-center gap-1.5 whitespace-nowrap rounded-none px-3.5 py-2.5 text-[12px] font-semibold uppercase leading-none tracking-[0.12em] transition-all duration-200 after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:-translate-y-px hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
    active
      ? "bg-accent-soft/90 text-accent-dark shadow-[inset_0_0_0_1px_rgba(30,111,217,0.14),0_10px_26px_rgba(30,111,217,0.08)] after:scale-x-100 dark:bg-white/[0.09] dark:text-white dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-ink-soft hover:bg-white/82 hover:text-ink hover:shadow-[0_10px_24px_rgba(16,25,43,0.07)] dark:text-white/68 dark:hover:bg-white/[0.08] dark:hover:text-white dark:hover:shadow-none"
  }`;
}

interface HeaderClientProps {
  phone: string;
  megaMenuVerticals: MegaMenuVerticalItem[];
  secondaryNav: { href: string; label: string }[];
}

export function HeaderClient({ phone, megaMenuVerticals, secondaryNav }: HeaderClientProps) {
  const [open, setOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(
    megaMenuVerticals[0]?.vertical ?? null,
  );
  const pathname = usePathname();
  const { items } = useSelection();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-[120] border-b border-border/80 bg-white/86 text-ink shadow-[0_18px_48px_rgba(16,25,43,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071423]/88 dark:text-white dark:shadow-[0_18px_54px_rgba(0,0,0,0.30)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-none focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>
      <header>
        <Container className="flex items-center justify-between gap-3 py-2.5 sm:gap-5 sm:py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo-light-trimmed.png"
              alt="SolBath Global Private Limited"
              width={461}
              height={129}
              priority
              className="h-9 w-auto object-contain min-[360px]:h-11 sm:h-12 dark:hidden"
            />
            <Image
              src="/logo.png"
              alt="SolBath Global Private Limited"
              width={460}
              height={127}
              priority
              className="hidden h-9 w-auto object-contain min-[360px]:h-11 dark:block dark:sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1.5 xl:flex">
            <ProductsMegaMenu
              verticals={megaMenuVerticals}
              triggerClassName={navLinkClass(megaMenuVerticals.some((v) => isActive(v.href)))}
            />

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
              className="relative flex items-center gap-2 whitespace-nowrap rounded-none px-3.5 py-2.5 text-[13px] font-medium tracking-[0.01em] text-ink-soft transition-all duration-200 hover:-translate-y-px hover:bg-stone hover:text-accent-dark hover:shadow-[0_10px_24px_rgba(16,25,43,0.07)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:text-white/75 dark:hover:bg-white/[0.08] dark:hover:text-white dark:hover:shadow-none"
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
              className="relative isolate overflow-hidden whitespace-nowrap rounded-none bg-accent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.11em] text-white shadow-[0_16px_34px_rgba(30,111,217,0.26)] transition-all duration-200 before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/2 before:bg-white/12 before:opacity-0 before:transition-opacity hover:-translate-y-px hover:bg-accent-dark hover:before:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Request a Quote
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1 xl:hidden">
            <Link
              href="/selection"
              aria-label="My Selection"
              className="relative flex h-9 w-9 items-center justify-center rounded-none text-ink-soft transition-colors hover:bg-stone hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-[360px]:h-10 min-[360px]:w-10 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
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
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-none bg-accent text-white shadow-[0_10px_24px_rgba(30,111,217,0.22)] transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-[360px]:h-10 min-[360px]:w-10"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </Container>

        {open ? (
          <div className="fixed inset-0 z-[130] xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 cursor-default bg-navy/42 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute right-0 top-0 flex h-[100dvh] w-[min(92vw,390px)] flex-col border-l border-border bg-white text-ink shadow-[0_30px_90px_rgba(16,25,43,0.28)] dark:border-white/10 dark:bg-[#071423] dark:text-white">
              <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-stone/35 px-4 dark:border-white/10 dark:bg-white/[0.035]">
                <Link
                  href="/"
                  className="flex min-w-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/logo-light-trimmed.png"
                    alt="SolBath Global Private Limited"
                    width={461}
                    height={129}
                    priority
                    className="h-9 w-auto max-w-[180px] object-contain dark:hidden"
                  />
                  <Image
                    src="/logo.png"
                    alt="SolBath Global Private Limited"
                    width={460}
                    height={127}
                    priority
                    className="hidden h-9 w-auto max-w-[180px] object-contain dark:block"
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-none bg-accent text-white shadow-[0_10px_24px_rgba(30,111,217,0.22)] transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  onClick={() => setOpen(false)}
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark dark:text-white/66">
                    Products
                  </span>
                  <ThemeToggle className="text-ink-soft hover:bg-stone hover:text-accent-dark dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white" />
                </div>

                <div className="grid gap-2">
                  {megaMenuVerticals.map((item) => {
                    const expanded = openMobileGroup === item.vertical;

                    return (
                      <div
                        key={item.href}
                        className="group/mobile overflow-hidden rounded-none border border-border bg-white shadow-[0_10px_24px_rgba(16,25,43,0.08)] transition-colors dark:border-white/10 dark:bg-[#071423] dark:shadow-none"
                      >
                        <button
                          type="button"
                          className={`relative flex w-full justify-between gap-3 overflow-hidden px-4 text-left text-white focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent ${
                            expanded ? "min-h-[108px] items-end py-4" : "min-h-[68px] items-center py-3"
                          }`}
                          aria-expanded={expanded}
                          onClick={() => setOpenMobileGroup(expanded ? null : item.vertical)}
                        >
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            sizes="(max-width: 1279px) 390px"
                            className="object-cover transition-[transform,filter] duration-700 ease-out group-hover/mobile:scale-[1.04] group-hover/mobile:saturate-[1.08]"
                          />
                          <span className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,20,35,0.92)_0%,rgba(7,20,35,0.72)_56%,rgba(7,20,35,0.34)_100%)] transition-opacity duration-500 group-hover/mobile:opacity-95" />
                          <span className="relative z-10 min-w-0 transition-transform duration-500 ease-out group-hover/mobile:-translate-y-0.5">
                            <span className="block text-base font-semibold tracking-[0.01em] text-white">
                              {item.name}
                            </span>
                            {expanded ? (
                              <span className="mt-1 block text-xs leading-relaxed text-white/70">
                                {item.tagline}
                              </span>
                            ) : null}
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
                              className="mb-1 flex items-center justify-between rounded-none px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white/85 dark:hover:bg-white/10"
                            >
                              View all {item.name}
                              <ArrowUpRight size={14} />
                            </Link>
                            {item.categories.map((category) => (
                              <Link
                                key={category.slug}
                                href={`/${item.vertical}/${category.slug}`}
                                onClick={() => setOpen(false)}
                                className="block rounded-none px-3 py-2.5 transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-white/10"
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
                </div>

                <div className="mt-4 grid gap-1 border-t border-border pt-4 dark:border-white/10">
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-none px-4 py-3 text-sm font-semibold tracking-[0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
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
                    className={`rounded-none px-4 py-3 text-sm font-semibold tracking-[0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive("/dealers")
                        ? "bg-accent-soft text-accent-dark dark:bg-white/10 dark:text-white"
                        : "text-ink hover:bg-stone hover:text-accent-dark dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    Find a Dealer
                  </Link>
                </div>

                <div className="mt-4 grid gap-1 rounded-none border border-border bg-stone/50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
                  <a
                    href={`tel:${phone}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-none px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Phone size={16} /> {phone}
                  </a>
                  <Link
                    href="/selection"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-none px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-white hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ClipboardList size={16} /> My Selection {items.length > 0 ? `(${items.length})` : ""}
                  </Link>
                </div>
              </div>

              <div className="shrink-0 border-t border-border bg-white p-4 dark:border-white/10 dark:bg-[#071423]">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="block rounded-none bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(30,111,217,0.24)] transition-all hover:-translate-y-px hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Request a Quote
                </Link>
              </div>
            </aside>
          </div>
        ) : null}
      </header>
    </div>
  );
}
