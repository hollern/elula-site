import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      default: "max-w-6xl",
      wide: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerProps = ComponentProps<"div"> & VariantProps<typeof containerVariants>;

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Container, containerVariants, type ContainerProps };
