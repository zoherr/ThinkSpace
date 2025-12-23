import { User, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface AuthorCardProps {
  author: string;
  date: string;
  readingTime: number;
}

export function AuthorCard({ author, date, readingTime }: AuthorCardProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="font-medium">{author}</span>
      </span>
      <span className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <time dateTime={date}>{format(new Date(date), "MMMM d, yyyy")}</time>
      </span>
      <span className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>{readingTime} min read</span>
      </span>
    </div>
  );
}
