"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Gauge, Hammer } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Simple",
    body: "No bloat. No setup nightmare. One QR, one tap, one experience.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    body: "Works even at venues with weak Wi-Fi. Entries never get lost.",
  },
  {
    icon: Hammer,
    title: "Built for real-world events",
    body: "Tested at trade shows, conferences, festivals, and pop-ups.",
  },
  {
    icon: Gauge,
    title: "Designed for speed",
    body: "Sub-second flows. Because attention at events is measured in seconds.",
  },
];

export default function Trust() {
  return (
    <section className="relative border-t border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Built to be invisible.{" "}
            <span className="gradient-text">In the best way.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Tap2Enter gets out of the way so the event — and the entry — just
            works.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-background-alt/40 p-5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
                <p.icon className="size-4 text-[#c9c0ff]" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
