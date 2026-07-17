"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function EnquiryForm({
  context,
  className,
}: {
  context?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      context,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldWrap = "group flex flex-col gap-2";
  const labelClass =
    "text-[10px] uppercase tracking-[0.2em] text-grey transition-colors group-focus-within:text-charcoal";
  const inputClass =
    "bg-transparent border-0 border-b border-charcoal/20 px-0 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className={fieldWrap}>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div className={fieldWrap}>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div className={`${fieldWrap} sm:col-span-2`}>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+971"
            className={inputClass}
          />
        </div>
        <div className={`${fieldWrap} sm:col-span-2`}>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us what you're looking for"
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group/btn mt-10 inline-flex items-center gap-3 bg-charcoal text-cream px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal/85 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm text-green-700">
          Thank you — your enquiry has been sent. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong. Please try again or email us directly at asre@ali-sons.com.
        </p>
      )}
    </form>
  );
}
