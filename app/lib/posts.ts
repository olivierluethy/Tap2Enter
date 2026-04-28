export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-paper-forms-are-killing-event-conversions",
    title: "Why Paper Forms Are Killing Event Conversions",
    description:
      "The hidden cost of every clipboard at your booth — and how it quietly bleeds your campaigns dry.",
    date: "2026-04-12",
    readTime: "5 min read",
    category: "Event marketing",
    body: [
      "Walk into any trade show, festival, or pop-up and you'll see them: stacks of forms, half-chewed pens, clipboards balanced on knees. It feels normal. It even feels productive. But the truth is uncomfortable — paper forms are one of the highest-leverage drop-off points in the entire event funnel.",
      "Every single field a visitor has to write by hand is a chance for them to walk away. Long forms feel longer in person. Short forms still take 30+ seconds. Multiply that by the number of booths a person passes, and the math turns brutal.",
      "On top of the friction, there's the data side. Studies of post-event lead capture consistently show error rates of 10–20% on handwritten contact details. That's one in five emails or phone numbers that simply doesn't work. Your most engaged leads — the ones who actually filled in the form — silently disappear.",
      "Then comes the back office. Hours of manual entry. Names mistyped. Duplicates. Lost sheets. By the time the data is clean enough to act on, the moment is gone, the lead is cold, and the next event is already on the calendar.",
      "QR-based digital entry flips the entire model. The friction drops to a single tap. The data is structured at the source. And — most importantly — your team can react in real time, not next week.",
      "If you're still running paper, you're not just spending money on printing. You're spending it on every lead you'll never convert.",
    ],
  },
  {
    slug: "how-qr-based-giveaways-increase-participation",
    title: "How QR-Based Giveaways Increase Participation",
    description:
      "What changes when entry takes one tap instead of one minute — and why it's not a small effect.",
    date: "2026-03-28",
    readTime: "4 min read",
    category: "Conversion",
    body: [
      "There's a very simple law of event marketing that most teams underestimate: friction kills participation, exponentially.",
      "When entry takes a minute on paper, only the most motivated people bother. When entry takes ten seconds via QR, the curious join too. When entry takes one tap because the user already filled their details once, even the casual passers-by participate.",
      "Each step you remove doesn't just shave time — it expands the pool of people willing to engage at all. That's why QR-based giveaways consistently outperform paper-based ones in real campaigns, often by 2–4x in raw participation rate.",
      "Beyond raw numbers, QR flows do something paper can never do: they let you personalize. A returning visitor's data is already there. A new visitor enters once and is recognized everywhere your QR appears next.",
      "The result is a feedback loop. More participants → richer data → smarter follow-up → better campaigns. Paper can't compete with that loop. It was never built to.",
    ],
  },
  {
    slug: "the-future-of-event-data-collection",
    title: "The Future of Event Data Collection",
    description:
      "Real-time, structured, frictionless. The shift is already happening — here's where it's going.",
    date: "2026-03-10",
    readTime: "6 min read",
    category: "Industry",
    body: [
      "Event data has been stuck in the past for a long time. Forms, spreadsheets, and a frantic two-week cleanup window after every show. The next generation of event tech doesn't tweak that workflow — it deletes it.",
      "Three shifts are converging right now. First, mobile-first capture is finally good enough that visitors can complete an entry in seconds, on whatever phone they happen to have. Second, structured data is replacing free-text fields, which means CRMs, email tools, and dashboards can ingest event data the moment it's captured. Third, identity portability is starting to mean something — visitors expect not to re-enter the same details at every booth.",
      "Put together, these shifts produce something paper-based events have never had: live signal. You don't wait until next Wednesday to know which booth converted best. You see it during the event, while you can still react.",
      "The teams that adopt this early will look like magicians to the ones still typing handwritten emails into spreadsheets. The advantage compounds, because every event sharpens the data set, which sharpens the targeting, which sharpens the next campaign.",
      "The future of event data isn't more forms. It's fewer — and the few that remain take one tap.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
