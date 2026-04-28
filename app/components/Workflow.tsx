"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { QrCode, UserRound, Gift, Check } from "lucide-react";
import { trackEvent } from "../lib/analytics";

type Step = {
  id: 1 | 2 | 3;
  title: string;
  caption: string;
  icon: typeof QrCode;
  preview: () => React.ReactNode;
};

function ScanPreview() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="relative size-40 rounded-2xl border border-border bg-background-alt/70 p-3">
        <div className="grid size-full grid-cols-6 gap-1">
          {Array.from({ length: 36 }, (_, i) => {
            const v = (i * 9301 + 49297) % 233280;
            const filled = v / 233280 > 0.45;
            return (
              <span
                key={i}
                className={`rounded-[2px] ${
                  filled ? "bg-foreground" : "bg-white/10"
                }`}
              />
            );
          })}
        </div>
        <div className="qr-scan-line absolute inset-x-2 top-2 h-10 rounded bg-gradient-to-b from-transparent via-[#00d4ff]/40 to-transparent blur" />
      </div>
      <p className="mt-4 text-xs text-muted">Point camera at QR</p>
    </div>
  );
}

function FormPreview() {
  const fields = [
    { label: "Full name", value: "Alex Morgan" },
    { label: "Email", value: "alex@morgan.co" },
    { label: "Phone", value: "+1 (415) 555-0188" },
  ];
  return (
    <div className="w-full max-w-xs space-y-2.5">
      {fields.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.12 }}
          className="rounded-xl border border-border bg-background-alt/60 p-3"
        >
          <div className="text-[10px] uppercase tracking-wider text-muted">
            {f.label}
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-foreground/90">{f.value}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 320 }}
              className="grid size-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-300"
            >
              <Check className="size-3" />
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function JoinPreview() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative w-full max-w-xs rounded-2xl border border-border bg-background-alt/60 p-5 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#7c5cff] to-[#00d4ff] text-[#06060c] shadow-lg shadow-[#7c5cff]/30">
          <Gift className="size-6" />
        </div>
        <p className="mt-3 text-sm font-medium">You&apos;re entered!</p>
        <p className="mt-1 text-xs text-muted">
          Winners notified by email within 24h.
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8 }}
          className="mt-4 h-1 rounded bg-gradient-to-r from-[#7c5cff] to-[#00d4ff]"
        />
      </div>
    </div>
  );
}

const steps: Step[] = [
  {
    id: 1,
    title: "Scan a QR code",
    caption: "Point any phone camera at the booth QR. No app required.",
    icon: QrCode,
    preview: ScanPreview,
  },
  {
    id: 2,
    title: "Fill out your details once",
    caption:
      "Save your info one time. Every future event recognizes you instantly.",
    icon: UserRound,
    preview: FormPreview,
  },
  {
    id: 3,
    title: "Join any giveaway instantly",
    caption: "One tap. You're in. The organizer gets clean data the moment you confirm.",
    icon: Gift,
    preview: JoinPreview,
  },
];

export default function Workflow() {
  const [active, setActive] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((s) => ((s % 3) + 1) as 1 | 2 | 3);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const current = steps.find((s) => s.id === active)!;
  const Preview = current.preview;

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#00d4ff]">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps. One smooth flow.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Tap2Enter takes the friction out of every event entry.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <ol className="flex flex-col gap-3">
            {steps.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(s.id);
                      trackEvent("workflow_step_click", { step: s.id });
                    }}
                    className={`relative w-full rounded-2xl border p-5 text-left transition-all ${
                      isActive
                        ? "border-[#7c5cff]/60 bg-gradient-to-br from-[#7c5cff]/10 to-[#00d4ff]/5 shadow-[0_0_0_1px_rgba(124,92,255,0.25),0_20px_40px_-20px_rgba(124,92,255,0.45)]"
                        : "border-border bg-background-alt/40 hover:bg-background-alt/70"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold transition ${
                          isActive
                            ? "bg-gradient-to-br from-[#7c5cff] to-[#00d4ff] text-[#06060c]"
                            : "bg-white/5 text-muted ring-1 ring-inset ring-white/10"
                        }`}
                      >
                        {s.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <s.icon
                            className={`size-4 ${
                              isActive ? "text-[#c9c0ff]" : "text-muted"
                            }`}
                          />
                          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                            {s.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {s.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="glass relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(0,212,255,0.14),transparent_55%)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="flex h-full w-full items-center justify-center"
              >
                <Preview />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {steps.map((s) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all ${
                    s.id === active ? "w-6 bg-foreground" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
