import clsx from "clsx";
import { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("container-page", className)}>{children}</div>;
}
