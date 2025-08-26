"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ICato, ShowAllCatogeries } from "@/utils/Server/getCatogiresOnServer";
import { useEffect, useState } from "react";

interface Props {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function AvilipileCatogiri({
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [categories, setCategories] = useState<ICato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ShowAllCatogeries();
        setCategories(data);
        setError("");
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Category *</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Category *</h3>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Category *</h3>
        <div className="text-gray-500 text-sm">No categories available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Category *</h3>
      <RadioGroup value={selectedCategory} className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RadioGroupItem
              value={category.id}
              id={category.id}
              onClick={() => {
                onCategoryChange(category.id);
              }}
            />
            <Label htmlFor={category.id} className="flex-1 cursor-pointer">
              {category.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <p className="text-xs text-gray-500">
        Select the category that best describes this product.
      </p>
    </div>
  );
}
