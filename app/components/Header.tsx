import Link from "next/link";
import { ScanLine } from "lucide-react";
import TrackedButton from "./TrackedButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#7c5cff] to-[#00d4ff] shadow-lg shadow-[#7c5cff]/30">
            <ScanLine className="size-4 text-[#06060c]" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Tap2Enter
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#how-it-works" className="hover:text-foreground transition">
            How it works
          </a>
          <a href="#organizers" className="hover:text-foreground transition">
            For organizers
          </a>
          <Link href="/blog" className="hover:text-foreground transition">
            Blog
          </Link>
        </nav>

        <TrackedButton
          href="#cta"
          event="early_access_click"
          eventParams={{ location: "header" }}
          variant="primary"
          className="!h-10 !px-4 text-sm"
        >
          Get Early Access
        </TrackedButton>
      </div>
    </header>
  );
}
