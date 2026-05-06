const SESSION_KEY = "t2e_session_id";
const UTM_KEY = "t2e_utm";

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function uuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback — RFC 4122 v4 from Math.random.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uuidV4();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  const cached = window.sessionStorage.getItem(UTM_KEY);
  if (cached) {
    try {
      return JSON.parse(cached) as UtmParams;
    } catch {
      // fallthrough — re-parse from URL
    }
  }

  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  if (source) utm.utm_source = source;
  if (medium) utm.utm_medium = medium;
  if (campaign) utm.utm_campaign = campaign;

  window.sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  return utm;
}
