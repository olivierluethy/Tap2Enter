"use client";

import { motion } from "framer-motion";
import {
  Database,
  Printer,
  Wand2,
  TrendingUp,
  AlertTriangle,
  Rocket,
} from "lucide-react";

const benefits = [
  {
    icon: Printer,
    title: "Zero printing costs",
    body: "No more pallets of forms, replacement pens, or last-minute reprints.",
  },
  {
    icon: Database,
    title: "No manual data entry",
    body: "Every entry lands in your dashboard already structured and exportable.",
  },
  {
    icon: AlertTriangle,
    title: "No handwriting errors",
    body: "Validated emails and phone numbers. Reachable leads, every time.",
  },
  {
    icon: Wand2,
    title: "Clean data, instantly",
    body: "Real-time CSV export and webhook delivery to your CRM of choice.",
  },
  {
    icon: Rocket,
    title: "Faster campaign execution",
    body: "Set up a giveaway in under 5 minutes. Print one QR. Done.",
  },
  {
    icon: TrendingUp,
    title: "Built-in conversion lift",
    body: "Frictionless flows mean more participants per visitor. Always.",
  },
];

export default function ForOrganizers() {
  return (
    <section
      id="organizers"
      className="relative border-y border-border/60 bg-background-alt/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#00d4ff]">
            For organizers
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A modern event tool that pays for itself by lunch.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Stop running campaigns on paper. Run them on data — in real time.
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
                <b.icon className="size-4 text-[#7cf0ff]" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {b.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
