import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CategoryLabelProps {
  category: { name: string; color: string };
  href?: boolean;
}

export function CategoryLabel({ category, href = true }: CategoryLabelProps) {
  const badge = (
    <Badge
      variant="secondary"
      className="text-xs font-medium hover:bg-primary/20 transition-colors"
    >
      {category.name}
    </Badge>
  );

  if (href) {
    return (
      <Link href={`/category/${encodeURIComponent(category.name)}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}
