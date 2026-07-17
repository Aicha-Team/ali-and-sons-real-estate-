"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import Dropdown from "@/components/Dropdown";

const CITY_OPTIONS = [
  { value: "Abu Dhabi", label: "Abu Dhabi" },
  { value: "Dubai", label: "Dubai" },
];
const CATEGORY_OPTIONS = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
];
const TYPE_OPTIONS = [
  { value: "For Rent", label: "For Rent" },
  { value: "For Sale", label: "For Sale" },
];

export default function PropertySearchBar() {
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
    "flex-1 flex flex-col gap-1 px-6 py-4 text-left sm:border-r sm:border-charcoal/10";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-grey";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row bg-cream shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] divide-y sm:divide-y-0 divide-charcoal/10"
    >
      <div className={fieldClass}>
        <span className={labelClass}>City</span>
        <Dropdown value={city} onChange={setCity} options={CITY_OPTIONS} placeholder="All Cities" />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Category</span>
        <Dropdown
          value={category}
          onChange={setCategory}
          options={CATEGORY_OPTIONS}
          placeholder="All Categories"
        />
      </div>
      <div className={fieldClass}>
        <span className={labelClass}>Type</span>
        <Dropdown value={type} onChange={setType} options={TYPE_OPTIONS} placeholder="All Types" />
      </div>
      <button
        type="submit"
        className="bg-charcoal text-cream px-8 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 py-4 sm:py-0 hover:bg-charcoal/85 transition-colors"
      >
        <Search size={15} />
        Search
      </button>
    </form>
  );
}
