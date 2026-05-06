"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { submitEmail, type ModalVariant } from "../lib/leadCapture";
import { trackEvent } from "../lib/analytics";

type Props = {
  open: boolean;
  variant: ModalVariant;
  leadId: number | null;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const COPY: Record<ModalVariant, {
  headline: string;
  subline: string;
  buttonLabel: string;
  successLine: string;
  emailRequired: boolean;
}> = {
  early_access: {
    headline: "Be first in line.",
    subline:
      "Drop your email — we'll reach out personally when Tap2Enter is ready for your event.",
    buttonLabel: "Get Early Access",
    successLine: "Thanks — we'll be in touch.",
    emailRequired: true,
  },
  demo: {
    headline: "Want a real demo?",
    subline:
      "We're still in beta. Leave your email and we'll send you a personal walkthrough — or scroll on to see how it works.",
    buttonLabel: "Send me a demo",
    successLine: "Thanks — your demo is on the way.",
    emailRequired: false,
  },
};

export default function LeadModal({ open, variant, leadId, onClose }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <ModalShell
          key={variant}
          variant={variant}
          leadId={leadId}
          onClose={onClose}
        />
      ) : null}
    </AnimatePresence>
  );
}

function ModalShell({
  variant,
  leadId,
  onClose,
}: {
  variant: ModalVariant;
  leadId: number | null;
  onClose: () => void;
}) {
  const copy = COPY[variant];
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const headingId = useId();
  const descId = useId();

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (leadId === null) {
      // Click-tracking failed earlier; can't tie this email to a lead row.
      setError("Something went wrong, please try again.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const result = await submitEmail({ leadId, email, honeypot });
    if (result.ok) {
      trackEvent("email_submitted", { variant });
      setStatus("success");
    } else {
      setStatus("error");
      setError(
        result.reason === "validation"
          ? "Please enter a valid email."
          : "Something went wrong, please try again.",
      );
    }
  }

  function handleSkipToHowItWorks() {
    onClose();
    requestAnimationFrame(() => {
      const target = document.getElementById("how-it-works");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby={headingId}
      aria-describedby={descId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative z-[101] w-full sm:max-w-md"
      >
        <div className="relative overflow-hidden rounded-t-3xl border border-border bg-background-alt/95 p-6 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-[#7c5cff]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-[#00d4ff]/15 blur-3xl"
          />

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-foreground transition"
          >
            <X className="size-4" />
          </button>

          {status === "success" ? (
            <div className="relative pt-2">
              <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
                {copy.successLine}
              </h2>
              <p id={descId} className="mt-3 text-sm text-muted">
                We&apos;ll only use your email to contact you about Tap2Enter.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative" noValidate>
              <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {copy.headline}
              </h2>
              <p id={descId} className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {copy.subline}
              </p>

              {/* Honeypot — visually hidden but reachable to bots filling forms by name. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <label className="mt-6 block">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Email
                </span>
                <input
                  ref={inputRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required={copy.emailRequired}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted/70 outline-none transition focus:border-[#7c5cff]/60 focus:ring-2 focus:ring-[#7c5cff]/20"
                />
              </label>

              <p className="mt-2 text-xs text-muted">
                We&apos;ll only use your email to contact you about Tap2Enter.
              </p>

              {error ? (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
              >
                {status === "submitting" ? "Sending…" : copy.buttonLabel}
                {status === "submitting" ? null : <ArrowRight className="size-4" />}
              </button>

              {variant === "demo" ? (
                <button
                  type="button"
                  onClick={handleSkipToHowItWorks}
                  className="mt-4 block w-full text-center text-sm text-muted hover:text-foreground transition"
                >
                  Just show me how it works
                </button>
              ) : null}
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
