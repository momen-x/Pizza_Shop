"use client";
import { Button } from "@/components/ui/button";
import { deleteCategoryWithProducts } from "@/utils/Server/DeleteCategory";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface iProps {
  id: string;
}

const DeleteButton = (props: iProps) => {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [, setError] = useState("");
  const handleDeleteCategory = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this category? All products in this category will also be deleted."
      )
    ) {
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteCategoryWithProducts(props.id);
      router.push("/Admin/categorie");
    } catch (error) {
      console.log(error);
      setError("Failed to delete category");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={handleDeleteCategory}
        disabled={deleteLoading}
        variant="destructive"
        className="flex items-center gap-2 py-5 sm:py-3 cursor-pointer"
      >
        {deleteLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <FaTrash className="text-sm text-red-600" />
        )}
        Delete Category
      </Button>
    </div>
  );
};

export default DeleteButton;
