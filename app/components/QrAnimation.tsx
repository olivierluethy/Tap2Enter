"use client";

import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

const cells = Array.from({ length: 49 }, (_, i) => i);

export default function QrAnimation() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px]">
      <div className="absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-[#7c5cff]/30 via-transparent to-[#00d4ff]/20 blur-2xl" />

      <div className="glass relative flex h-full w-full items-center justify-center rounded-[28px] p-6 shadow-2xl">
        <span className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <span className="absolute left-3 top-3 size-5 rounded-tl-md border-l-2 border-t-2 border-[#7c5cff]" />
        <span className="absolute right-3 top-3 size-5 rounded-tr-md border-r-2 border-t-2 border-[#00d4ff]" />
        <span className="absolute bottom-3 left-3 size-5 rounded-bl-md border-b-2 border-l-2 border-[#00d4ff]" />
        <span className="absolute bottom-3 right-3 size-5 rounded-br-md border-b-2 border-r-2 border-[#7c5cff]" />

        <div className="grid grid-cols-7 gap-1.5 p-2">
          {cells.map((i) => {
            const seed = (i * 9301 + 49297) % 233280;
            const filled = seed / 233280 > 0.42;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: filled ? 1 : 0.18,
                  scale: filled ? 1 : 0.85,
                }}
                transition={{
                  delay: (i % 7) * 0.03 + Math.floor(i / 7) * 0.04,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className={`size-5 rounded-sm sm:size-6 ${
                  filled ? "bg-foreground" : "bg-white/10"
                }`}
              />
            );
          })}
        </div>

        <div className="qr-scan-line pointer-events-none absolute inset-x-4 top-0 h-12 rounded-md bg-gradient-to-b from-[#7c5cff]/0 via-[#00d4ff]/40 to-[#7c5cff]/0 blur-md" />

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-alt/80 px-3 py-1 text-xs text-muted backdrop-blur">
            <QrCode className="size-3.5" />
            tap2enter.com
          </span>
        </div>
      </div>
    </div>
  );
}
