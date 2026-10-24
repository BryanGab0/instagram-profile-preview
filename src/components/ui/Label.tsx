import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium select-none", className)} {...props} />;
}
