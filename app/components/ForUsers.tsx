"use client";

import { motion } from "framer-motion";
import { Hand, Hourglass, Bolt, ThumbsUp } from "lucide-react";

const items = [
  { icon: Hand, title: "No repetition", body: "Type your details once. Forever." },
  { icon: Hourglass, title: "No waiting", body: "Skip the line. Skip the pen." },
  { icon: Bolt, title: "Instant participation", body: "Tap. You're in." },
  { icon: ThumbsUp, title: "Smooth on mobile", body: "Built mobile-first for the way real events feel." },
];

export default function ForUsers() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#7c5cff]">
            For visitors
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Less typing. More winning.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Designed for the person standing at the booth, holding a drink, in
            a hurry.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#7c5cff]/30 to-[#00d4ff]/20 ring-1 ring-inset ring-white/10">
                <it.icon className="size-5 text-foreground" />
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
    </section>
  );
}
