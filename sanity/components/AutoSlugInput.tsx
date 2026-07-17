import { useEffect } from "react";
import { set, unset, useFormValue, type SlugInputProps } from "sanity";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

export function AutoSlugInput(props: SlugInputProps) {
  const { onChange, value } = props;
  const title = useFormValue(["title"]) as string | undefined;

  useEffect(() => {
    const next = title ? slugify(title) : undefined;
    if (!next) {
      if (value?.current) onChange(unset());
      return;
    }
    if (next !== value?.current) {
      onChange(set({ _type: "slug", current: next }));
    }
  }, [title, value?.current, onChange]);

  return null;
}
