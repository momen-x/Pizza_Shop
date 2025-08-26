"use client";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/utils/Server/deleteproduct";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
  id: string;
}
const DeleteProductsButton = (props: IProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      setDeleteLoading(true);
      if (confirm("are you sure , you want delete this product")) {
        await deleteProduct(props.id);
        router.refresh();
        router.push("/Admin/products");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={handleDeleteProduct}
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

export default DeleteProductsButton;
