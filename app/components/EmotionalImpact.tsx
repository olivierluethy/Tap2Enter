"use client";

import { motion } from "framer-motion";

const phrases = [
  "Same name.",
  "Same email.",
  "Same phone number.",
  "Over and over again.",
];

export default function EmotionalImpact() {
  return (
    <section className="relative border-y border-border/60 bg-background-alt/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ul className="space-y-3">
          {phrases.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={
                i === phrases.length - 1
                  ? "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                  : "text-2xl font-medium tracking-tight text-muted sm:text-3xl"
              }
            >
              {p}
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Why are you{" "}
          <span className="gradient-text">still writing this?</span>
        </motion.p>
      </div>
    </section>
  );
}
