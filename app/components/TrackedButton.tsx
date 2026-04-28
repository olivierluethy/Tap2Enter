"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackEvent } from "../lib/analytics";

type Variant = "primary" | "secondary";

type Props = {
  href: string;
  event: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  eventParams?: Record<string, string | number | boolean | undefined>;
} & Omit<ComponentProps<typeof Link>, "href">;

export default function TrackedButton({
  href,
  event,
  variant = "primary",
  children,
  className = "",
  external = false,
  eventParams,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm sm:text-base whitespace-nowrap";
  const styles = variant === "primary" ? "btn-primary" : "btn-secondary";
  const cls = `${base} ${styles} ${className}`.trim();

  const onClick = () => trackEvent(event, eventParams);

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
