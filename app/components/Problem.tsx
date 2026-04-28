"use client";

import { motion } from "framer-motion";
import { FileWarning, PenLine, Clock4, ClipboardX } from "lucide-react";

const problems = [
  {
    icon: PenLine,
    title: "Handwritten chaos",
    body:
      "Cramped pens at busy booths. Half-legible scribbles. Lost leads before the event even ends.",
  },
  {
    icon: Clock4,
    title: "Time wasted on both sides",
    body:
      "Visitors stop, queue, write. Organizers spend the next week deciphering and typing it all in.",
  },
  {
    icon: FileWarning,
    title: "Errors no one catches",
    body:
      "One wrong letter in an email and the prize, the discount, the lead — gone. Forever.",
  },
  {
    icon: ClipboardX,
    title: "Stacks of paper, no insight",
    body:
      "Boxes of forms back at the office. Manual entry. Printing costs. And still no real-time data.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#7c5cff]">
            The problem
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Paper forms quietly kill your event.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            At every booth, every giveaway, every contest — the same broken
            ritual plays out. Visitors are slowed down. Data is lost. And
            organizers pay the price long after the lights go out.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] ring-1 ring-inset ring-white/10">
                  <p.icon className="size-5 text-[#c9c0ff]" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
