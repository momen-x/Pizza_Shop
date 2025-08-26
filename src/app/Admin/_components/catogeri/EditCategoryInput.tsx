"use client";
import React, { FormEvent, useState } from "react";
// import pizzaBackground from "../../../../../public/assets/images/pizza3.jpeg";
// import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPlusCircle, FaSave } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { editCatogry } from "@/utils/Server/EditCategories";
import { useRouter } from "next/navigation";

interface ICategory {
  name: string;
  description: string;
  id: string;
}

const EditCategoryInput = (props: ICategory) => {
  const router = useRouter();
  const [categories, setCategories] = useState({
    name: props.name,
    description: props.description,
  });
  const [originCategories] = useState({
    name: props.name,
    description: props.description,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading] = useState<boolean>(false);

  const validation = () => {
    if (
      originCategories.description === categories.description &&
      originCategories.name === categories.name
    ) {
      setError("No changes detected");
      return false;
    }
    if (!categories.description.trim() || !categories.name.trim()) {
      setError("Please fill in all fields");
      return false;
    }
    if (categories.name.trim().length < 5) {
      setError("Category name must be at least 5 characters");
      return false;
    }
    if (categories.description.trim().length < 10) {
      setError("Description must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleEditCategory = async (e: FormEvent) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await editCatogry(categories, props.id);
      if (res.success) {
        setSuccess("Category updated successfully!");
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setError(res.message || "Failed to update category");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen w-3xl flex items-center justify-center p-4 ">
      {/* Background pizza image with overlay */}

      <Card className="w-full max-w-2xl z-10 border-0 shadow-2xl backdrop-blur-md rounded-xl">
        <CardHeader className="text-center space-y-4 pb-6 pt-8">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full">
              <FaPlusCircle className="text-white text-2xl" />
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Edit Category
          </CardTitle>
          <CardDescription className="text-base">
            Update your category information
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEditCategory} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium">
                Category Name *
              </Label>
              <Input
                disabled={loading}
                id="name"
                type="text"
                placeholder="e.g., Pizzas, Sides, Desserts"
                required
                className="py-5 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500"
                value={categories.name}
                onChange={(e) => {
                  setCategories({ ...categories, name: e.target.value });
                  setError("");
                }}
              />
              <p className="text-xs text-gray-500">
                Minimum 5 characters required
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                disabled={loading}
                id="description"
                placeholder="Describe this category (e.g., Our delicious selection of handcrafted pizzas)"
                required
                rows={4}
                className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 resize-none"
                value={categories.description}
                onChange={(e) => {
                  setCategories({ ...categories, description: e.target.value });
                  setError("");
                }}
              />
              <p className="text-xs text-gray-500">
                Minimum 10 characters required
              </p>
            </div>

            <div className="pt-2">
              <Button
                disabled={
                  loading ||
                  deleteLoading ||
                  !categories.name.trim() ||
                  !categories.description.trim() ||
                  (originCategories.description === categories.description &&
                    originCategories.name === categories.name)
                }
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Category...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update Category
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategoryInput;
