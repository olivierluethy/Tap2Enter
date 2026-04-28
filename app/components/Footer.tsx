import Link from "next/link";
import { ScanLine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background-alt/40">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#7c5cff] to-[#00d4ff]">
              <ScanLine className="size-4 text-[#06060c]" />
            </span>
            <span className="text-sm font-semibold">Tap2Enter</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Scan once. Enter once. Done. The end of paper forms at events.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/#how-it-works" className="hover:text-foreground transition">
            How it works
          </Link>
          <Link href="/#organizers" className="hover:text-foreground transition">
            For organizers
          </Link>
          <Link href="/blog" className="hover:text-foreground transition">
            Blog
          </Link>
          <a href="mailto:hello@tap2enter.com" className="hover:text-foreground transition">
            Contact
          </a>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted sm:px-6">
          <span>© {new Date().getFullYear()} Tap2Enter. All rights reserved.</span>
          <span>tap2enter.com</span>
        </div>
      </div>
    </footer>
  );
}
