import { getSessionId, getUtmParams } from "./session";

export type TriggerSource =
  | "demo_hero"
  | "demo_other"
  | "early_access_hero"
  | "early_access_nav"
  | "early_access_cta";

export type ModalVariant = "early_access" | "demo";

export function variantForTrigger(trigger: TriggerSource): ModalVariant {
  return trigger.startsWith("demo") ? "demo" : "early_access";
}

function apiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}${path}`;
}

export type TrackClickResult =
  | { ok: true; leadId: number }
  | { ok: false };

export async function trackClick(trigger: TriggerSource): Promise<TrackClickResult> {
  if (typeof window === "undefined") return { ok: false };

  const utm = getUtmParams();
  const payload = {
    session_id: getSessionId(),
    trigger_source: trigger,
    referrer: document.referrer || undefined,
    ...utm,
  };

  try {
    const res = await fetch(apiUrl("/track-click.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as { success?: boolean; lead_id?: number };
    if (data.success && typeof data.lead_id === "number") {
      return { ok: true, leadId: data.lead_id };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export type SubmitEmailResult =
  | { ok: true }
  | { ok: false; reason: "validation" | "network" };

export async function submitEmail(args: {
  leadId: number;
  email: string;
  honeypot: string;
}): Promise<SubmitEmailResult> {
  if (typeof window === "undefined") return { ok: false, reason: "network" };

  try {
    const res = await fetch(apiUrl("/submit-email.php"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: getSessionId(),
        lead_id: args.leadId,
        email: args.email,
        website: args.honeypot,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (res.ok && data.success) return { ok: true };
    if (res.status === 400) return { ok: false, reason: "validation" };
    return { ok: false, reason: "network" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
