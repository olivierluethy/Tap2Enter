import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { posts } from "../lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, research, and field notes on QR-based event entry, paperless giveaways, and modern data capture.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Tap2Enter Blog",
    description:
      "Ideas and research on QR-based event entry and paperless giveaways.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#7c5cff]">
              Blog
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Notes from the end of paper.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Short, useful reads on building modern, frictionless event flows.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <BlogCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                description={p.description}
                date={p.date}
                readTime={p.readTime}
                category={p.category}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
