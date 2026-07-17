"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import Dropdown from "@/components/Dropdown";
import { Taxonomy } from "@/lib/types";

function toOptions(items: Taxonomy[]) {
  return items.map((item) => ({ value: item.slug, label: item.name }));
}

export default function PropertySearchBar({
  cities,
  categories,
  types,
}: {
  cities: Taxonomy[];
  categories: Taxonomy[];
  types: Taxonomy[];
}) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const fieldClass =
    "flex-1 flex flex-col gap-1 px-5 sm:px-6 py-3.5 sm:py-4 text-left sm:border-r sm:border-white/15 last:border-r-0 first:rounded-t-2xl sm:first:rounded-l-full sm:first:rounded-tr-none last:rounded-b-2xl sm:last:rounded-r-full sm:last:rounded-bl-none";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-white/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch w-full max-w-4xl mx-auto rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] divide-y sm:divide-y-0 divide-white/15"
    >
      <div className={fieldClass}>
        <span className={labelClass}>City</span>
        <Dropdown
          value={city}
          onChange={setCity}
          options={toOptions(cities)}
          placeholder="All Cities"
          tone="dark"
        />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Category</span>
        <Dropdown
          value={category}
          onChange={setCategory}
          options={toOptions(categories)}
          placeholder="All Categories"
          tone="dark"
        />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Type</span>
        <Dropdown
          value={type}
          onChange={setType}
          options={toOptions(types)}
          placeholder="All Types"
          tone="dark"
        />
      </div>
      <button
        type="submit"
        className="bg-white text-charcoal px-6 sm:px-8 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 py-4 sm:py-0 m-2 sm:m-1.5 rounded-xl sm:rounded-full hover:bg-white/90 active:scale-[0.98] transition-all shrink-0"
      >
        <Search size={15} />
        <span className="sm:hidden">Search Properties</span>
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
