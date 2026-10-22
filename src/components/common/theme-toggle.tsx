"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { uiCopy } from "@/lib/content";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Icons swap via the `dark` class rather than `resolvedTheme`, so the server
  // render matches the client and there's no hydration mismatch.
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={uiCopy.themeToggle.label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}
