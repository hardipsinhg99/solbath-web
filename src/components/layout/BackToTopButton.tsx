"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 420;

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.setTimeout(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }, prefersReducedMotion ? 0 : 450);
  };

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-none border border-white/70 bg-white/90 text-ink shadow-[0_16px_36px_rgba(16,25,43,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp size={20} strokeWidth={1.8} aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
