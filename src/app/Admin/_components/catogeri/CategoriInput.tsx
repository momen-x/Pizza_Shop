"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaPlusCircle } from "react-icons/fa";
// import Image from "next/image";
// import pizzaBackground from "../../../../../public/assets/images/pizzaHome.jpeg";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddNewCategories } from "@/utils/Server/AddNewCategoriOnServer";

const AddCategorinput = () => {
  const router = useRouter();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dataValidation = (): boolean => {
    if (!category.name.trim() || !category.description.trim()) {
      setError("Both name and description are required");
      return false;
    }

    if (category.name.trim().length < 3) {
      setError("Category name must be at least 3 characters long");
      return false;
    }

    if (category.description.trim().length < 10) {
      setError("Description should be at least 10 characters long");
      return false;
    }

    setError("");
    return true;
  };

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();

    if (!dataValidation()) {
      return;
    }

    setLoading(true);
    try {
      const result = await AddNewCategories(category);
      if (result.success) {
        setError("");
        router.push("/Admin/categorie");
      } else {
        setError(result.message);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 relative overflow-hidden md:w-xl lg:w-4xl">
      {/* Background pizza image with overlay */}
      {/* <div className="fixed inset-0 z-0">
        <Image
          src={pizzaBackground}
          alt="Pizza background"
          fill
          className="object-cover opacity-15 dark:opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-gray-900/80 dark:to-gray-800/80"></div>
      </div> */}

      <Card className="w-full m-auto max-w-md z-10 border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full">
              <FaPlusCircle className="text-white text-2xl" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Create New Category
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Add a new category to organize your menu items
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleAddCategory} className="space-y-5">
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
                value={category.name}
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value });
                }}
              />
              <p className="text-xs text-gray-500">
                Minimum 3 characters required
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
                value={category.description}
                onChange={(e) => {
                  setCategory({ ...category, description: e.target.value });
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
                  !category.name.trim() ||
                  !category.description.trim()
                }
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Category...
                  </>
                ) : (
                  <>
                    <FaPlusCircle className="mr-2" />
                    Create Category
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

export default AddCategorinput;
