import { cn } from "@/lib/utils/cn";
import { Badge } from "./Badge";

type SectionHeaderProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto text-center items-center",
        align === "start" && "text-start items-start",
        className
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <h2 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
