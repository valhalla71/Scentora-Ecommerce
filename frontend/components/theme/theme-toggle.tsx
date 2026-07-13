"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
  systemLabel: string;
};

export function ThemeToggle({
  lightLabel,
  darkLabel,
  systemLabel,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label={systemLabel}
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? lightLabel : darkLabel;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
