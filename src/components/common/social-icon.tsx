import type { ComponentProps } from "react";
import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";

// Lucide v1 dropped brand icons, so brand marks come from simple-icons and
// render in the current text color.
function SocialIcon({
  icon,
  className,
  ...props
}: Omit<ComponentProps<"svg">, "children"> & { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
}

export { SocialIcon };
