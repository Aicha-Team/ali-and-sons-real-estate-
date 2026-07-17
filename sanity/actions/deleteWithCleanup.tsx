import { useCallback, useState } from "react";
import { useClient } from "sanity";
import type { DocumentActionComponent, DocumentActionProps } from "sanity";

const REFERENCE_FIELD: Record<string, string> = {
  city: "city",
  propertyCategory: "category",
  propertyType: "type",
};

export const deleteWithCleanupAction: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const { id, type, draft, published, onComplete } = props;
  const client = useClient({ apiVersion: "2024-01-01" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [affectedCount, setAffectedCount] = useState<number | null>(null);

  const fieldName = REFERENCE_FIELD[type];
  if (!fieldName) return null;

  const openConfirm = useCallback(async () => {
    const referencingIds: string[] = await client.fetch(
      `*[_type == "property" && references($id) && defined(${fieldName})]._id`,
      { id: published?._id ?? draft?._id ?? id }
    );
    setAffectedCount(referencingIds.length);
    setConfirmOpen(true);
  }, [client, id, fieldName, draft, published]);

  const handleConfirm = useCallback(async () => {
    setDeleting(true);
    try {
      const referencingIds: string[] = await client.fetch(
        `*[_type == "property" && references($id) && defined(${fieldName})]._id`,
        { id: published?._id ?? draft?._id ?? id }
      );

      const tx = client.transaction();
      referencingIds.forEach((propId) => {
        tx.patch(propId, { unset: [fieldName] });
      });
      if (draft) tx.delete(draft._id);
      if (published) tx.delete(published._id);

      await tx.commit();
      onComplete();
    } catch (err) {
      console.error("Delete with cleanup failed:", err);
      setDeleting(false);
      setConfirmOpen(false);
    }
  }, [client, id, fieldName, draft, published, onComplete]);

  return {
    label: deleting ? "Deleting…" : "Delete",
    tone: "critical",
    disabled: deleting,
    onHandle: openConfirm,
    dialog: confirmOpen && {
      type: "confirm",
      onCancel: () => setConfirmOpen(false),
      onConfirm: handleConfirm,
      message:
        affectedCount === null
          ? "Checking for properties using this item…"
          : affectedCount === 0
            ? "Delete this item? It isn't used by any property."
            : `Delete this item? It will be removed from ${affectedCount} propert${
                affectedCount === 1 ? "y" : "ies"
              } currently using it — those listings will stay on the site but will need a new selection for this field before they can be published again. This can't be undone.`,
    },
  };
};
