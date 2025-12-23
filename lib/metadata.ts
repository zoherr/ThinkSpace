import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com";
const siteName = "TechInsight";
const siteDescription = "Modern tech blog covering web development, AI, design, and digital innovation";

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  author,
}: {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
}): Metadata {
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const finalDescription = description || siteDescription;
  const finalImage = image || `${siteUrl}/og-image.jpg`;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

  return {
    title: fullTitle,
    description: finalDescription,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      url: finalUrl,
      siteName,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: type as any,
      ...(publishedTime && { publishedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: finalDescription,
      images: [finalImage],
      creator: "@yourtwitterhandle",
    },
    alternates: {
      canonical: finalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateBlogPostSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [image],
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export const defaultMetadata: Metadata = generateSEO({
  title: siteName,
  description: siteDescription,
});
