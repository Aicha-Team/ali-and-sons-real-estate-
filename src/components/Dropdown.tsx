"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownOption = { value: string; label: string };

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 bg-transparent text-sm text-charcoal cursor-pointer"
      >
        <span className={cn(!selected && "text-charcoal/60")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-grey transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 min-w-[180px] bg-cream border border-charcoal/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)] py-1"
          >
            <li role="option" aria-selected={value === ""}>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-charcoal/70 hover:bg-charcoal/5 transition-colors"
              >
                {placeholder}
                {value === "" && <Check size={13} className="text-charcoal" />}
              </button>
            </li>
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={value === option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-charcoal/5",
                    value === option.value ? "text-charcoal" : "text-charcoal/70"
                  )}
                >
                  {option.label}
                  {value === option.value && <Check size={13} className="text-charcoal" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
