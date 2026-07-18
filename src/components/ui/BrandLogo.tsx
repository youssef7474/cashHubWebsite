import Image from "next/image";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "light" | "dark";
};

export function BrandLogo({
  className,
  priority = false,
  variant = "light",
}: BrandLogoProps) {
  const src = variant === "dark" ? logoDark : logo;

  return (
    <Image
      src={src}
      alt="CashHub"
      width={168}
      height={50}
      className={cn("h-10 w-auto", className)}
      priority={priority}
    />
  );
}
