"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-80 max-w-[calc(100vw-3rem)] bg-cream border border-charcoal/10 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
          >
            <div className="border-b border-charcoal/10 px-6 py-5 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-grey">
                  ASRE
                </span>
                <span className="font-display text-xl text-charcoal">How can we help?</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-grey hover:text-charcoal transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-6 flex-1 min-h-[160px] text-sm text-grey leading-relaxed">
              Hi! How can we help you today?
            </div>
            <div className="border-t border-charcoal/10 px-6 py-4 flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                disabled
                className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-charcoal/30 border-0 border-b border-charcoal/20 px-0 py-2 focus:outline-none disabled:opacity-60"
              />
              <button
                disabled
                className="text-charcoal disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full border border-charcoal/15 bg-cream/80 backdrop-blur-md text-charcoal flex items-center justify-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] hover:bg-charcoal hover:text-cream transition-colors duration-300"
        aria-label="Open chat"
      >
        {open ? (
          <X size={18} />
        ) : (
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium">Chat</span>
        )}
      </button>
    </div>
  );
}
