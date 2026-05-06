"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import { trackClick, type TriggerSource } from "../lib/leadCapture";
import { useLeadModal } from "./LeadModalProvider";

type Variant = "primary" | "secondary";

type Props = {
  href: string;
  event: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  eventParams?: Record<string, string | number | boolean | undefined>;
  /**
   * When set, the click is intercepted: anchor navigation is suppressed,
   * a server-side click is recorded, and the lead modal opens.
   */
  triggerSource?: TriggerSource;
} & Omit<ComponentProps<typeof Link>, "href">;

export default function TrackedButton({
  href,
  event,
  variant = "primary",
  children,
  className = "",
  external = false,
  eventParams,
  triggerSource,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm sm:text-base whitespace-nowrap";
  const styles = variant === "primary" ? "btn-primary" : "btn-secondary";
  const cls = `${base} ${styles} ${className}`.trim();

  const modal = useLeadModal();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, eventParams);

    if (triggerSource) {
      e.preventDefault();
      // Open the modal immediately so it never feels laggy. Resolve the
      // lead_id in the background and patch it in once the request returns.
      modal.open({ trigger: triggerSource, leadId: null });
      trackClick(triggerSource).then((res) => {
        if (res.ok) {
          modal.setLeadId({ trigger: triggerSource, leadId: res.leadId });
        } else {
          // Spec: don't bother the user on track failures, just log.
          console.warn("[t2e] track-click failed");
        }
      });
    }
  };

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
