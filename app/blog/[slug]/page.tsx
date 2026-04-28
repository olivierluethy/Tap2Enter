import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TrackedButton from "../../components/TrackedButton";
import { getPost, posts } from "../../lib/posts";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <div className="mt-8 flex items-center gap-3 text-xs text-muted">
            <span className="rounded-full border border-border bg-background-alt/60 px-2.5 py-1 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {post.description}
          </p>

          <div className="divider-glow my-10" />

          <div className="space-y-5 text-base leading-[1.75] text-foreground/90 sm:text-lg">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-background-alt/40 p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Stop running events on paper.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              See how Tap2Enter replaces the entire form-and-clipboard ritual
              with one tap.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <TrackedButton
                href="/#how-it-works"
                event="demo_click"
                eventParams={{ location: "blog_post", slug: post.slug }}
                variant="primary"
              >
                See Demo
              </TrackedButton>
              <TrackedButton
                href="/#cta"
                event="early_access_click"
                eventParams={{ location: "blog_post", slug: post.slug }}
                variant="secondary"
              >
                Get Early Access
              </TrackedButton>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
