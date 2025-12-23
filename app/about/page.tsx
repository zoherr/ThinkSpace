import { Container } from "@/components/Container";
import { generateSEO } from "@/lib/metadata";

export const metadata = generateSEO({
  title: "About",
  description: "Learn more about TechInsight and our mission to share cutting-edge tech insights",
  url: "/about",
});

export default function AboutPage() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            About TechInsight
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Welcome to TechInsight, your destination for cutting-edge insights on
              technology, design, and digital innovation.
            </p>

            <h2>Our Mission</h2>
            <p>
              We aim to demystify complex technologies and share practical insights
              that help developers, designers, and tech enthusiasts stay ahead in
              the rapidly evolving digital landscape.
            </p>

            <h2>What We Cover</h2>
            <ul>
              <li>Web Development & Modern Frameworks</li>
              <li>Artificial Intelligence & Machine Learning</li>
              <li>Product Design & User Experience</li>
              <li>Software Architecture & Best Practices</li>
              <li>Developer Tools & Productivity</li>
              <li>Industry Trends & Future Technologies</li>
            </ul>

            <h2>Join Our Community</h2>
            <p>
              Whether you're a seasoned professional or just starting your tech
              journey, TechInsight provides valuable content that inspires learning
              and growth. Follow us on social media and subscribe to stay updated
              with our latest articles.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
