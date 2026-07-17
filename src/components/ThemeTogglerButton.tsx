"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "system";
type Direction = "btt" | "ttb" | "ltr" | "rtl";
type Variant =
  | "default"
  | "accent"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg";

export interface ThemeTogglerButtonProps
  extends Omit<React.ComponentProps<"button">, "onClick"> {
  variant?: Variant;
  size?: Size;
  modes?: Mode[];
  direction?: Direction;
  onImmediateChange?: (theme: Mode) => void;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-charcoal text-cream hover:bg-charcoal/85",
  accent: "bg-offwhite text-charcoal hover:bg-offwhite/70",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-charcoal/20 text-charcoal hover:bg-offwhite",
  secondary: "bg-offwhite text-charcoal hover:bg-offwhite/70",
  ghost: "text-charcoal hover:bg-offwhite",
  link: "text-charcoal underline-offset-4 hover:underline",
};

const SIZE_CLASSES: Record<Size, string> = {
  default: "h-10 w-10",
  sm: "h-8 w-8",
  lg: "h-12 w-12",
};

const DIRECTION_CLIP: Record<Direction, (x: number, y: number) => string[]> = {
  ltr: () => ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
  rtl: () => ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
  ttb: () => ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
  btt: () => ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
};

export function ThemeTogglerButton({
  className,
  variant = "default",
  size = "default",
  modes = ["light", "dark"],
  direction = "ltr",
  onImmediateChange,
  ...props
}: ThemeTogglerButtonProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  function nextMode(): Mode {
    const current = (theme as Mode) ?? "system";
    const idx = modes.indexOf(current);
    return modes[(idx + 1) % modes.length] ?? modes[0];
  }

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const next = nextMode();
    onImmediateChange?.(next);

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsViewTransitions) {
      setTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const [fromClip, toClip] = DIRECTION_CLIP[direction](x, y);

    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        { clipPath: [fromClip, toClip] },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      // view transition unsupported at runtime — theme already applied via setTheme
    }
  }

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center justify-center transition-colors",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {!mounted ? (
        <Sun size={18} className="opacity-0" />
      ) : isDark ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}

export default ThemeTogglerButton;
