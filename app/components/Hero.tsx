"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import TrackedButton from "./TrackedButton";
import QrAnimation from "./QrAnimation";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,#000_50%,transparent_85%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(124,92,255,0.18),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/60 px-3 py-1 text-xs text-muted"
          >
            <Sparkles className="size-3.5 text-[#7c5cff]" />
            One scan replaces every paper form
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Stop filling out the same form.{" "}
            <span className="gradient-text">Every. Single. Time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Scan once. Enter once. Done. Tap2Enter is the QR-powered shortcut
            that ends repetitive event forms — for visitors{" "}
            <span className="text-foreground/90">and</span> organizers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <TrackedButton
              href="#how-it-works"
              event="demo_click"
              eventParams={{ location: "hero" }}
              variant="primary"
            >
              <PlayCircle className="size-5" />
              See Live Demo
            </TrackedButton>
            <TrackedButton
              href="#cta"
              event="early_access_click"
              eventParams={{ location: "hero" }}
              variant="secondary"
            >
              Get Early Access
              <ArrowRight className="size-4" />
            </TrackedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              No app download
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#7c5cff]" />
              Works on any phone
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#00d4ff]" />
              Built for real-world events
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="float-soft mx-auto w-full max-w-md lg:ml-auto"
        >
          <QrAnimation />
        </motion.div>
      </div>
    </section>
  );
}
