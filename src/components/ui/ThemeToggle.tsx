"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(emptySubscribe, () => true, () => false);

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-none transition-colors ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} strokeWidth={1.75} />
        ) : (
          <Moon size={18} strokeWidth={1.75} />
        )
      ) : (
        <span className="block h-[18px] w-[18px]" />
      )}
    </button>
  );
}
