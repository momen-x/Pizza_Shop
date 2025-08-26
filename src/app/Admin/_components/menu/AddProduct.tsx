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
import { FaPlusCircle, FaCheck, FaImage } from "react-icons/fa";
// import Image from "next/image";
// import pizzaBackground from "../../../../../public/assets/images/pizzaHome.jpeg";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AvilapileSizeAndExres } from "./AvilapileSizeAndExres";
import { AvilipileCatogiri } from "./AvilipileCatogiri";
import { ProductSizes, ExtraIngredients } from "@prisma/client";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import { addNewProduct } from "@/utils/Server/productOnServer";
import Image from "next/image";

// Types for the form data
interface ProductFormData {
  name: string;
  description: string;
  basePrice: number;
  image: string;
  selectedCategory: string;
  selectedSizes: {
    size: ProductSizes;
    price: number;
  }[];
  selectedExtras: {
    extra: ExtraIngredients;
    price: number;
  }[];
}

const AddProduct = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Main product form state
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    description: "",
    basePrice: 0,
    image: "",
    selectedCategory: "",
    selectedSizes: [],
    selectedExtras: [],
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setProductData((prev) => ({
      ...prev,
      selectedCategory: categoryId,
    }));
  };

  // Handle size selection and pricing
  const handleSizeChange = (
    size: ProductSizes,
    isSelected: boolean,
    price: number = 0
  ) => {
    setProductData((prev) => ({
      ...prev,
      selectedSizes: isSelected
        ? [
            ...prev.selectedSizes.filter((s) => s.size !== size),
            { size, price },
          ]
        : prev.selectedSizes.filter((s) => s.size !== size),
    }));
  };

  // Handle extra selection and pricing
  const handleExtraChange = (
    extra: ExtraIngredients,
    isSelected: boolean,
    price: number = 0
  ) => {
    setProductData((prev) => ({
      ...prev,
      selectedExtras: isSelected
        ? [
            ...prev.selectedExtras.filter((e) => e.extra !== extra),
            { extra, price },
          ]
        : prev.selectedExtras.filter((e) => e.extra !== extra),
    }));
  };

  const dataValidation = (step: number = 4): boolean => {
    if (step >= 1) {
      if (!productData.name.trim() || !productData.description.trim()) {
        setError("Both name and description are required");
        setActiveStep(1);
        return false;
      }

      if (productData.name.trim().length < 3) {
        setError("Product name must be at least 3 characters long");
        setActiveStep(1);
        return false;
      }

      if (productData.description.trim().length < 10) {
        setError("Description should be at least 10 characters long");
        setActiveStep(1);
        return false;
      }
    }

    if (step >= 2) {
      if (productData.basePrice <= 0) {
        setError("Base price must be greater than 0");
        setActiveStep(2);
        return false;
      }

      if (!productData.image.trim()) {
        setError("Must add url image to the photo");
        setActiveStep(2);
        return false;
      }
    }

    if (step >= 3) {
      if (!productData.selectedCategory) {
        setError("Please select a category");
        setActiveStep(3);
        return false;
      }
    }

    if (step >= 4) {
      if (productData.selectedSizes.length === 0) {
        setError("Please select at least one size");
        setActiveStep(4);
        return false;
      }
    }

    setError("");
    return true;
  };

  const nextStep = () => {
    if (dataValidation(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 5));
      setError("");
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();

    if (!dataValidation(4)) {
      return;
    }

    setLoading(true);
    try {
      // Prepare data for the server action
      const serverData = {
        name: productData.name,
        description: productData.description,
        imgUrl: productData.image,
        size: productData.selectedSizes.map((s) => s.size),
        extras:
          productData.selectedExtras.length > 0
            ? productData.selectedExtras.map((e) => e.extra)
            : undefined,
        category: productData.selectedCategory,
        basePrice: productData.basePrice,
        sizePrices: productData.selectedSizes.reduce((acc, curr) => {
          acc[curr.size] = curr.price;
          return acc;
        }, {} as Record<ProductSizes, number>),
        extraPrices: productData.selectedExtras.reduce((acc, curr) => {
          acc[curr.extra] = curr.price;
          return acc;
        }, {} as Record<ExtraIngredients, number>),
      };

      const result = await addNewProduct(serverData);

      if (result.success) {
        setError("");
        setSuccess(true);
        setActiveStep(5);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // const handleImageLoad = () => {
  //   setImageLoaded(true);
  //   setImageError(false);
  // };

  // const handleImageError = () => {
  //   setImageError(true);
  //   setImageLoaded(false);
  // };

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Pricing & Image" },
    { id: 3, title: "Category" },
    { id: 4, title: "Options" },
    { id: 5, title: "Complete" },
  ];

  return (
    <div className="min-h-screen  m-auto flex items-start justify-center p-4 mb-12 mx-16 md:w-2xl lg:w-4xl">
      <div className="w-fit m-auto max-w-4xl z-10 mt-16">
        <Card className="border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full">
                <FaPlusCircle className="text-white text-2xl" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Create New Product
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Add a new product to your menu with all the necessary details
            </CardDescription>

            {/* Progress Steps */}
            <div className="w-full mt-6">
              <div className="flex justify-between relative mb-8">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center z-10 relative"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                      ${
                        activeStep >= step.id
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      }
                      ${
                        activeStep > step.id && "bg-green-500 border-green-500"
                      }`}
                    >
                      {activeStep > step.id ? (
                        <FaCheck className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        activeStep >= step.id ? "font-medium" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${(activeStep - 1) * 25}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && activeStep === 5 && (
              <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Product created successfully. You can now view it in your
                  menu.
                </AlertDescription>
              </Alert>
            )}

            <form
              onSubmit={handleAddProduct}
              className="space-y-6 md:w-xl lg:w-2.5xl"
            >
              {/* Step 1: Basic Information */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-orange-700">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Product Name *
                      </Label>
                      <Input
                        disabled={loading}
                        id="name"
                        type="text"
                        placeholder="e.g., Margherita Pizza, Garlic Bread"
                        required
                        className="py-3 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500"
                        value={productData.name}
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            name: e.target.value,
                          });
                        }}
                      />
                      <p className="text-xs text-gray-500">
                        {productData.name.length}/150 characters (min. 3)
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description *
                      </Label>
                      <Textarea
                        disabled={loading}
                        id="description"
                        placeholder="Describe this product in detail (ingredients, taste, etc.)"
                        required
                        rows={5}
                        className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 resize-none"
                        value={productData.description}
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            description: e.target.value,
                          });
                        }}
                      />
                      <p className="text-xs text-gray-500">
                        {productData.description.length}/400 characters (min.
                        10)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Pricing & Image */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-orange-700">
                    Pricing & Image
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                      <div className="space-y-3">
                        <Label
                          htmlFor="basePrice"
                          className="text-sm font-medium"
                        >
                          Base Price ($) *
                        </Label>
                        <Input
                          disabled={loading}
                          id="basePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          required
                          className="py-3 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500"
                          value={productData.basePrice}
                          onChange={(e) => {
                            setProductData({
                              ...productData,
                              basePrice: parseFloat(e.target.value) || 0,
                            });
                          }}
                        />
                        <p className="text-xs text-gray-500">
                          Enter the base price without extras
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="image" className="text-sm font-medium">
                          Image URL *
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaImage className="text-gray-400" />
                          </div>
                          <Input
                            disabled={loading}
                            id="image"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="py-3 pl-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500"
                            value={productData.image}
                            onChange={(e) => {
                              setProductData({
                                ...productData,
                                image: e.target.value,
                              });
                              setImageLoaded(false);
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Required: URL of the product image
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      {productData.image ? (
                        <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                          {!imageLoaded && !imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="animate-pulse text-gray-400">
                                Loading image...
                              </div>
                            </div>
                          )}
                          {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                              <div className="text-red-500 text-sm">
                                Failed to load image
                              </div>
                            </div>
                          )}
                          <Image
                            src={extractDirectImageUrl(productData.image)}
                            alt="Product preview"
                            fill
                            className="object-cover"
                            // onLoad={handleImageLoad}
                            // onError={handleImageError}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <FaImage className="mx-auto h-12 w-12" />
                            <p className="mt-2">
                              Image preview will appear here
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Category */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-orange-700">
                    Select Category
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose a category for your product
                  </p>
                  <AvilipileCatogiri
                    selectedCategory={productData.selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              )}

              {/* Step 4: Sizes and Extras */}
              {activeStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-orange-700">
                    Product Options
                  </h3>
                  <p className="text-sm text-gray-600">
                    Select available sizes and extra ingredients
                  </p>
                  <AvilapileSizeAndExres
                    selectedSizes={productData.selectedSizes}
                    selectedExtras={productData.selectedExtras}
                    onSizeChange={handleSizeChange}
                    onExtraChange={handleExtraChange}
                  />
                </div>
              )}

              {/* Step 5: Success */}
              {activeStep === 5 && (
                <div className="text-center py-10 animate-fadeIn">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Product Created Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your new product has been added to the menu.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setProductData({
                          name: "",
                          description: "",
                          basePrice: 0,
                          image: "",
                          selectedCategory: "",
                          selectedSizes: [],
                          selectedExtras: [],
                        });
                        setActiveStep(1);
                        setSuccess(false);
                      }}
                    >
                      Add Another Product
                    </Button>
                    <Button
                      type="button"
                      onClick={() => router.push("/Admin/products")}
                    >
                      View Products
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {activeStep < 5 && (
                <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={activeStep === 1 || loading}
                  >
                    Previous
                  </Button>

                  {activeStep < 4 ? (
                    <Button type="button" onClick={nextStep} disabled={loading}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating Product...
                        </>
                      ) : (
                        <>
                          <FaPlusCircle className="mr-2" />
                          Create Product
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
