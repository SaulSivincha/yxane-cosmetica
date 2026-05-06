"use client";

import { Trash2 } from "lucide-react";

type DeleteProductButtonProps = {
  productTitle: string;
};

export function DeleteProductButton({ productTitle }: DeleteProductButtonProps) {
  return (
    <button
      type="submit"
      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-700 transition-colors hover:bg-red-50"
      aria-label={`Eliminar ${productTitle}`}
      onClick={(event) => {
        if (!confirm(`Eliminar "${productTitle}" definitivamente?`)) {
          event.preventDefault();
        }
      }}
    >
      <Trash2 size={17} />
    </button>
  );
}
