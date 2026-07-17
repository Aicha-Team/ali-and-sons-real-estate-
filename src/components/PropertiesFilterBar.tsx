"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import { Taxonomy } from "@/lib/types";

function toOptions(items: Taxonomy[]) {
  return items.map((item) => ({ value: item.slug, label: item.name }));
}

export default function PropertiesFilterBar({
  cities,
  categories,
  types,
}: {
  cities: Taxonomy[];
  categories: Taxonomy[];
  types: Taxonomy[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") ?? "";
  const category = searchParams.get("category") ?? "";
  const type = searchParams.get("type") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const fieldClass =
    "flex-1 flex flex-col gap-1 px-6 py-3 sm:border-r sm:border-charcoal/10";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] text-grey";

  return (
    <div className="sticky top-20 md:top-24 z-30 bg-cream/95 backdrop-blur border-b border-charcoal/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center divide-y sm:divide-y-0 divide-charcoal/10">
        <div className={fieldClass}>
          <span className={labelClass}>City</span>
          <Dropdown
            value={city}
            onChange={(v) => update("city", v)}
            options={toOptions(cities)}
            placeholder="All Cities"
          />
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Category</span>
          <Dropdown
            value={category}
            onChange={(v) => update("category", v)}
            options={toOptions(categories)}
            placeholder="All Categories"
          />
        </div>
        <div className={fieldClass}>
          <span className={labelClass}>Type</span>
          <Dropdown
            value={type}
            onChange={(v) => update("type", v)}
            options={toOptions(types)}
            placeholder="All Types"
          />
        </div>
        {(city || category || type) && (
          <button
            onClick={() => router.push("/properties")}
            className="text-[10px] uppercase tracking-[0.2em] text-grey hover:text-charcoal transition-colors px-6 py-3 text-left sm:text-center shrink-0"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
