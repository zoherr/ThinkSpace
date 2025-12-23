import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-2xl hover:text-primary transition-colors">
            TechInsight
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary hidden sm:block"
            >
              Home
            </Link>
            <Link
              href="/archive"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            {/* <ThemeToggle /> */}
          </div>
        </nav>
      </Container>
    </header>
  );
}
