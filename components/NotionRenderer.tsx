import Image from "next/image";
import { cn } from "@/lib/utils";

interface NotionRendererProps {
  blocks: any[];
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {blocks.map((block, index) => (
        <NotionBlock key={block.id} block={block} index={index} />
      ))}
    </article>
  );
}

function NotionBlock({ block, index }: { block: any; index: number }) {
  const { type } = block;

  switch (type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading_1":
      return <Heading1 block={block} index={index} />;
    case "heading_2":
      return <Heading2 block={block} index={index} />;
    case "heading_3":
      return <Heading3 block={block} index={index} />;
    case "bulleted_list_item":
      return <BulletedListItem block={block} />;
    case "numbered_list_item":
      return <NumberedListItem block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "code":
      return <Code block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "divider":
      return <hr className="my-8" />;
    default:
      return null;
  }
}

function RichText({ richText }: { richText: any[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text: any, i: number) => {
        let content = text.plain_text;

        if (text.annotations.bold) {
          content = <strong key={i}>{content}</strong>;
        }
        if (text.annotations.italic) {
          content = <em key={i}>{content}</em>;
        }
        if (text.annotations.strikethrough) {
          content = <del key={i}>{content}</del>;
        }
        if (text.annotations.underline) {
          content = <u key={i}>{content}</u>;
        }
        if (text.annotations.code) {
          content = <code key={i}>{content}</code>;
        }
        if (text.href) {
          content = (
            <a key={i} href={text.href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          );
        }

        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

function Paragraph({ block }: { block: any }) {
  const richText = block.paragraph?.rich_text;
  if (!richText || richText.length === 0) return <p className="my-4">&nbsp;</p>;

  return (
    <p className="my-4 leading-relaxed">
      <RichText richText={richText} />
    </p>
  );
}

function Heading1({ block, index }: { block: any; index: number }) {
  const richText = block.heading_1?.rich_text;
  const text = richText?.map((t: any) => t.plain_text).join("") || "";

  return (
    <h1 id={`heading-${index}`} className="scroll-mt-24 mt-12 mb-4">
      <RichText richText={richText} />
    </h1>
  );
}

function Heading2({ block, index }: { block: any; index: number }) {
  const richText = block.heading_2?.rich_text;
  const text = richText?.map((t: any) => t.plain_text).join("") || "";

  return (
    <h2 id={`heading-${index}`} className="scroll-mt-24 mt-10 mb-4">
      <RichText richText={richText} />
    </h2>
  );
}

function Heading3({ block, index }: { block: any; index: number }) {
  const richText = block.heading_3?.rich_text;
  const text = richText?.map((t: any) => t.plain_text).join("") || "";

  return (
    <h3 id={`heading-${index}`} className="scroll-mt-24 mt-8 mb-3">
      <RichText richText={richText} />
    </h3>
  );
}

function BulletedListItem({ block }: { block: any }) {
  const richText = block.bulleted_list_item?.rich_text;

  return (
    <li className="my-2">
      <RichText richText={richText} />
    </li>
  );
}

function NumberedListItem({ block }: { block: any }) {
  const richText = block.numbered_list_item?.rich_text;

  return (
    <li className="my-2">
      <RichText richText={richText} />
    </li>
  );
}

function Quote({ block }: { block: any }) {
  const richText = block.quote?.rich_text;

  return (
    <blockquote className="my-6 border-l-4 border-primary pl-6 italic">
      <RichText richText={richText} />
    </blockquote>
  );
}

function Code({ block }: { block: any }) {
  const richText = block.code?.rich_text;
  const code = richText?.map((t: any) => t.plain_text).join("") || "";
  const language = block.code?.language || "text";

  return (
    <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}

function ImageBlock({ block }: { block: any }) {
  const imageUrl =
    block.image?.file?.url ||
    block.image?.external?.url ||
    "";

  if (!imageUrl) return null;

  const caption = block.image?.caption?.[0]?.plain_text || "";

  return (
    <figure className="my-8">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={caption || "Blog post image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
