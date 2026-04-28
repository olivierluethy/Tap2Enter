"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Smartphone, Repeat } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "One-tap participation",
    body: "From scan to entry in seconds. No keyboard gymnastics.",
  },
  {
    icon: Repeat,
    title: "No repeated forms",
    body: "Your details, remembered. Every event, instant.",
  },
  {
    icon: ShieldCheck,
    title: "No paper, no printing",
    body: "Zero waste. Zero logistics. Zero headaches.",
  },
  {
    icon: Smartphone,
    title: "Instant digital capture",
    body: "Clean, structured data delivered the moment a guest joins.",
  },
];

export default function Solution() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#7c5cff]">
              The solution
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Meet <span className="gradient-text">Tap2Enter</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              The simplest way to run paperless event entries. Built for the
              real world: noisy booths, busy hands, short attention spans.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              Scan once. Enter once.{" "}
              <span className="text-foreground/90">Done.</span>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass rounded-2xl p-5"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-[#7c5cff]/30 to-[#00d4ff]/20 ring-1 ring-inset ring-white/10">
                  <it.icon className="size-4 text-foreground" />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {it.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
