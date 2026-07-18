import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent-300/40 bg-accent-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-accent-600 uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
