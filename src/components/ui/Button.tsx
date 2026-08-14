import Link from "next/link";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "bg-accent text-white hover:bg-accent-dark",
  ghost: "border border-accent bg-transparent text-accent hover:bg-accent hover:text-white",
  "outline-light": "border border-accent bg-accent text-white hover:bg-accent-dark",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
