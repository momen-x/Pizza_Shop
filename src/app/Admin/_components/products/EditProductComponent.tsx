"use client";
import { ExtraIngredients, ProductSizes } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Save,
  X,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import { ShowAllCatogeries } from "@/utils/Server/getCatogiresOnServer";
import { editProduct } from "@/utils/Server/EditProduct";

interface ISize {
  name: ProductSizes;
  price: number;
}

interface IExtras {
  name: ExtraIngredients;
  price: number;
}

interface IProps {
  id: string;
  size: ISize[];
  extras?: IExtras[];
  category: string;
  basePrise: number;
  name: string;
  description: string;
  image: string;
}

// Define available options
// const CATEGORIES = ['Pizza', 'Pasta', 'Salad', 'Drink', 'Dessert'];
const SIZE_OPTIONS = Object.values(ProductSizes);
const EXTRA_OPTIONS = Object.values(ExtraIngredients);

const EditProductComponent = (props: IProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [extras, setExtras] = useState<IExtras[]>([]);
  const [basePrice, setBasePrice] = useState(0);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ShowAllCatogeries();
        const categores = res.map((c) => {
          return c.name;
        });
        // console.log("res is : ", categores);

        setCategories(categores);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    setBasePrice(props.basePrise);
    setSizes(props.size || []);
    setExtras(props.extras || []);
    setName(props.name);
    setDescription(props.description);
    setImage(props.image);
    setCategory(props.category);
  }, [props]);

  const handleSizeChange = (
    index: number,
    field: keyof ISize,
    value: string | ProductSizes
  ) => {
    const newSizes = [...sizes];
    if (field === "price") {
      newSizes[index] = {
        ...newSizes[index],
        [field]: parseFloat(value as string) || 0,
      };
    } else {
      newSizes[index] = { ...newSizes[index], [field]: value as ProductSizes };
    }
    setSizes(newSizes);
  };

  const addSize = () => {
    const availableSizes = SIZE_OPTIONS.filter(
      (sizeOption) => !sizes.some((s) => s.name === sizeOption)
    );
    if (availableSizes.length > 0) {
      setSizes([...sizes, { name: availableSizes[0], price: 0 }]);
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleExtraChange = (
    index: number,
    field: keyof IExtras,
    value: string | ExtraIngredients
  ) => {
    const newExtras = [...extras];
    if (field === "price") {
      newExtras[index] = {
        ...newExtras[index],
        [field]: parseFloat(value as string) || 0,
      };
    } else {
      newExtras[index] = {
        ...newExtras[index],
        [field]: value as ExtraIngredients,
      };
    }
    setExtras(newExtras);
  };

  const addExtra = () => {
    const availableExtras = EXTRA_OPTIONS.filter(
      (extraOption) => !extras.some((e) => e.name === extraOption)
    );
    if (availableExtras.length > 0) {
      setExtras([...extras, { name: availableExtras[0], price: 0 }]);
    }
  };

  const removeExtra = (index: number) => {
    setExtras(extras.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!description || description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!basePrice || basePrice <= 0) {
      newErrors.basePrice = "Base price must be a positive number";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (sizes.length === 0) {
      newErrors.sizes = "At least one size must be selected";
    }

    // Validate sizes
    sizes.forEach((size, index) => {
      if ((size.name !== "SMALL" && size.price == 0) || size.price < 0) {
        console.log("size name is", size.name, size.price);

        newErrors[`size_${index}_price`] = "Price must be a positive number";
      }
    });

    // Validate extras
    extras.forEach((extra, index) => {
      if (extra.price < 0) {
        newErrors[`extra_${index}_price`] = "Price must be non-negative";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSaveStatus(null);

    try {
      const submitData = {
        name,
        description,
        image,
        basePrice,
        category,
        sizes, // Changed from size to sizes
        extras,
      };

      const response = await editProduct(submitData, props.id);

      if (!response.success) {
        throw new Error("Failed to update product");
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus("error");
      setErrors({ root: "Failed to update product. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const availableSizes = SIZE_OPTIONS.filter(
    (size) => !sizes.some((s) => s.name === size)
  );

  const availableExtras = EXTRA_OPTIONS.filter(
    (extra) => !extras.some((e) => e.name === extra)
  );

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
          <div className="flex items-center space-x-2">
            {saveStatus === "success" && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span className="text-sm">Saved successfully</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {errors.root && (
          <div className="flex items-center p-4  border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{errors.root}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-2">
                Product Name
              </Label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image" className="block text-sm font-medium mb-2">
                Image URL
              </Label>
              <div className="flex">
                <input
                  type="url"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image URL"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="basePrice"
                  className="block text-sm font-medium mb-2"
                >
                  Base Price ($)
                </Label>
                <input
                  type="number"
                  id="basePrice"
                  step="0.01"
                  min="0"
                  value={basePrice}
                  onChange={(e) =>
                    setBasePrice(parseFloat(e.target.value) || 0)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.basePrice ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.basePrice}
                  </p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium mb-2">
                  Category
                </Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`dark:bg-gray-900 bg-white cursor-pointer  w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.category ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  {/* <option value="">Select category</option> */}
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="cursor-pointer">
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sizes and Extras */}
          <div className="space-y-6">
            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Sizes</h3>
                <Button
                  type="button"
                  onClick={addSize}
                  disabled={availableSizes.length === 0}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Size
                </Button>
              </div>

              {errors.sizes && (
                <p className="mb-2 text-sm text-red-600">{errors.sizes}</p>
              )}

              <div className="space-y-2">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 border rounded-lg"
                  >
                    <select
                      value={size.name}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          "name",
                          e.target.value as ProductSizes
                        )
                      }
                      className={`dark:bg-gray-900 bg-white cursor-pointer  w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.category ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      {SIZE_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          disabled={sizes.some(
                            (s, i) => s.name === option && i !== index
                          )}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`size_${index}_price`]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <Button
                      type="button"
                      onClick={() => removeSize(index)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {errors[`size_${index}_price`] && (
                      <p className="text-sm text-red-600">
                        {errors[`size_${index}_price`]}
                      </p>
                    )}
                  </div>
                ))}
                {sizes.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
                    No sizes added yet. Click &quot;Add Size&quot; to get
                    started.
                  </p>
                )}
              </div>
            </div>

            {/* Extras */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Extras</h3>
                <Button
                  type="button"
                  onClick={addExtra}
                  disabled={availableExtras.length === 0}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Extra
                </Button>
              </div>

              <div className="space-y-2">
                {extras.map((extra, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 border rounded-lg"
                  >
                    <select
                      value={extra.name}
                      onChange={(e) =>
                        handleExtraChange(
                          index,
                          "name",
                          e.target.value as ExtraIngredients
                        )
                      }
                      className={`dark:bg-gray-900 bg-white cursor-pointer  w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.category ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      {EXTRA_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          disabled={extras.some(
                            (e, i) => e.name === option && i !== index
                          )}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={extra.price}
                      onChange={(e) =>
                        handleExtraChange(index, "price", e.target.value)
                      }
                      placeholder="Price"
                      className={`w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors[`extra_${index}_price`]
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <Button
                      type="button"
                      onClick={() => removeExtra(index)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {errors[`extra_${index}_price`] && (
                      <p className="text-sm text-red-600">
                        {errors[`extra_${index}_price`]}
                      </p>
                    )}
                  </div>
                ))}
                {extras.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center border-2 border-dashed border-gray-300 rounded-lg">
                    No extras added yet. Click &quot;Add Extra&quot; to get
                    started.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mt-6">
            <Label className="block text-sm font-medium mb-2">
              Image Preview
            </Label>
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={extractDirectImageUrl(image)}
                alt="Product preview"
                className="w-full h-full object-cover"
                height={200}
                width={300}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={() => window.history.back()}
            variant="outline"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductComponent;
