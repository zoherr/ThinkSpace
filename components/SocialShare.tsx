"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Link2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        asChild
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        asChild
      >
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
