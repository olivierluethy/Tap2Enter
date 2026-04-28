"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import TrackedButton from "./TrackedButton";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#7c5cff]/15 via-background-alt to-[#00d4ff]/10 p-8 text-center sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-[#7c5cff]/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-[#00d4ff]/20 blur-3xl"
          />

          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            You&apos;ve filled out{" "}
            <span className="gradient-text">enough forms</span> already.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Be one of the first organizers to ditch paper for good — or one of
            the first visitors to never write your email at a booth again.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedButton
              href="#how-it-works"
              event="demo_click"
              eventParams={{ location: "cta" }}
              variant="primary"
            >
              <PlayCircle className="size-5" />
              See Demo
            </TrackedButton>
            <TrackedButton
              href="mailto:hello@tap2enter.com?subject=Early%20Access"
              event="early_access_click"
              eventParams={{ location: "cta" }}
              variant="secondary"
              external
            >
              Get Early Access
              <ArrowRight className="size-4" />
            </TrackedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
