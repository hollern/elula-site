import Image from "next/image";

import type { CustomerLogo } from "@/lib/types";
import { cn } from "@/lib/utils";

type LogoCloudProps = {
  logos: CustomerLogo[];
  /** Short line above the logos, e.g. "Trusted by teams at". */
  title?: string;
  className?: string;
};

function LogoCloud({ logos, title, className }: LogoCloudProps) {
  return (
    <div data-slot="logo-cloud" className={cn("flex flex-col items-center gap-8", className)}>
      {title && <p className="text-sm font-medium text-muted-foreground">{title}</p>}
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((logo) => {
          const image = (
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className={cn(
                "h-7 w-auto max-w-40 object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0",
                logo.invertOnDark && "dark:invert",
              )}
            />
          );
          return (
            <li key={logo.name}>
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noopener noreferrer">
                  {image}
                </a>
              ) : (
                image
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { LogoCloud };
