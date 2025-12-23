export function calculateReadingTime(blocks: any[]): number {
  const wordsPerMinute = 200;
  let totalWords = 0;

  blocks.forEach((block: any) => {
    const text = extractTextFromBlock(block);
    totalWords += text.split(/\s+/).filter(Boolean).length;
  });

  const minutes = Math.ceil(totalWords / wordsPerMinute);
  return minutes || 1;
}

function extractTextFromBlock(block: any): string {
  let text = "";

  if (block.paragraph?.rich_text) {
    text += block.paragraph.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.heading_1?.rich_text) {
    text += block.heading_1.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.heading_2?.rich_text) {
    text += block.heading_2.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.heading_3?.rich_text) {
    text += block.heading_3.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.bulleted_list_item?.rich_text) {
    text += block.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.numbered_list_item?.rich_text) {
    text += block.numbered_list_item.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.quote?.rich_text) {
    text += block.quote.rich_text.map((t: any) => t.plain_text).join("");
  }
  if (block.code?.rich_text) {
    text += block.code.rich_text.map((t: any) => t.plain_text).join("");
  }

  return text;
}

export function extractHeadings(blocks: any[]) {
  const headings: { id: string; text: string; level: number }[] = [];

  blocks.forEach((block: any, index: number) => {
    if (block.heading_1?.rich_text) {
      headings.push({
        id: `heading-${index}`,
        text: block.heading_1.rich_text.map((t: any) => t.plain_text).join(""),
        level: 1,
      });
    } else if (block.heading_2?.rich_text) {
      headings.push({
        id: `heading-${index}`,
        text: block.heading_2.rich_text.map((t: any) => t.plain_text).join(""),
        level: 2,
      });
    } else if (block.heading_3?.rich_text) {
      headings.push({
        id: `heading-${index}`,
        text: block.heading_3.rich_text.map((t: any) => t.plain_text).join(""),
        level: 3,
      });
    }
  });

  return headings;
}
