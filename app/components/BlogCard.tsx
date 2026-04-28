"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "../lib/analytics";

type Props = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
};

export default function BlogCard({
  slug,
  title,
  description,
  date,
  readTime,
  category,
}: Props) {
  return (
    <Link
      href={`/blog/${slug}`}
      onClick={() =>
        trackEvent("blog_click", { slug, location: "blog_index" })
      }
      className="group glass relative flex flex-col rounded-2xl p-6 transition hover:border-[#7c5cff]/50 hover:shadow-[0_0_0_1px_rgba(124,92,255,0.25)]"
    >
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="rounded-full border border-border bg-background-alt/60 px-2.5 py-1 uppercase tracking-wider">
          {category}
        </span>
        <span>{readTime}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <time className="text-muted" dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span className="inline-flex items-center gap-1 text-foreground/90 transition group-hover:gap-2">
          Read
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
