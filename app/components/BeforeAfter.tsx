"use client";

import { motion } from "framer-motion";
import { FileX2, Sparkles } from "lucide-react";

export default function BeforeAfter() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Before vs after
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            The same event. Two very different days.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-background-alt/40 p-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted">
              <FileX2 className="size-4 text-rose-400" />
              Without Tap2Enter
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-400/70" />
                Long lines at the booth, pens running out
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-400/70" />
                Illegible handwriting → unreachable leads
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-400/70" />
                Hours of manual data entry after the event
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-400/70" />
                No real-time view of who participated
              </li>
            </ul>
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-rose-500/10 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-[#7c5cff]/40 bg-gradient-to-br from-[#7c5cff]/10 to-[#00d4ff]/5 p-6"
          >
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="size-4 text-[#c9c0ff]" />
              <span className="text-foreground/90">With Tap2Enter</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                One scan, one tap, instant entry
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                Clean, validated data — every time
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                Zero post-event data entry
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                Live participation dashboard for organizers
              </li>
            </ul>
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#7c5cff]/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
