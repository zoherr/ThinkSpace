import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Page not found
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/archive">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse articles
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
