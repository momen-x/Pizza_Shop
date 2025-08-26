import { prisma } from "@/lib/prisma";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ListOrdered,
  Plus,
  Edit,
  Package,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";
import { IoArrowBack } from "react-icons/io5";

import Image from "next/image";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import Link from "@/app/_components/Link/Link";
import DeleteButton from "@/app/Admin/_components/catogeri/DeleteButton";

interface IProps {
  params: Promise<{ id: string }>;
}

interface ISize {
  id: string;
  name: string;
  price: number;
}

interface IExtra {
  id: string;
  name: string;
  price: number;
}

interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  basePrice: number;
  sizes: ISize[];
  extras: IExtra[];
}

interface ICategory {
  products: IProduct[];
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  order: number;
  updatedAt: Date;
}

const CategoryDynamicPage = async ({ params }: IProps) => {
  const id = (await params).id;

  const data: ICategory | null = await prisma.category.findUnique({
    where: { id: id },
    include: {
      products: {
        include: {
          sizes: true,
          extras: true,
        },
      },
    },
  });

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
              <Package className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium mb-1">Category Not Found</h3>
            <p className="">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button className="mt-4">Back to Categories</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">{data.name}</h1>
            <p className=" mt-2">{data.description}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Link href={`/Admin/categorie/addCategori/${id}/EditCategori.tsx`}>
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Category
              </Button>
            </Link>
            <DeleteButton id={id} />
          </div>
        </div>
        <div>
          <Link
            href={"/Admin/categorie"}
            className="p-2  mb-4 font-bold text-lg flex items-center justify-center gap-2 w-20"
          >
            {" "}
            <IoArrowBack className="text-sm "/> Back
          </Link>
        </div>

        {/* Category Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-mediu flex items-center gap-2">
                <ListOrdered className="w-4 h-4" />
                Category Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.order}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {new Date(data.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium  flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {new Date(data.updatedAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Products in this Category
              <Badge variant="secondary" className="ml-2">
                {data.products.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              All products associated with this category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.products.length > 0 ? (
              <div className="space-y-6">
                {data.products.map((product) => (
                 <Link key={product.id} href={`/Admin/products/${product.id}`}>
                 <div  className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-48 h-32  rounded-md overflow-hidden">
                        {product.image ? (
                          <Image
                            src={extractDirectImageUrl(product.image)}
                            alt={product.name}
                            width={192}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center ">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {product.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <ListOrdered className="w-3 h-3" />
                            Order: {product.order}
                          </Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Base Price */}
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Base Price:</span>
                            <span>${product.basePrice.toFixed(2)}</span>
                          </div>

                          {/* Sizes */}
                          <div>
                            <h4 className="font-medium flex items-center gap-2 mb-2">
                              <Layers className="w-4 h-4 text-blue-600" />
                              Available Sizes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {product.sizes.map((size) => (
                                <Badge
                                  key={size.id}
                                  variant="secondary"
                                  className="gap-1"
                                >
                                  {size.name} (+${size.price.toFixed(2)})
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Extras */}
                          <div className="md:col-span-2">
                            <h4 className="font-medium flex items-center gap-2 mb-2">
                              <Tag className="w-4 h-4 text-purple-600" />
                              Available Extras
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {product.extras.map((extra) => (
                                <Badge
                                  key={extra.id}
                                  variant="outline"
                                  className="gap-1"
                                >
                                  {extra.name} (+${extra.price.toFixed(2)})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />
                  </div>
                 </Link>

                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No products yet
                </h3>
                <p className="text-gray-500">
                  Get started by adding your first product to this category
                </p>
                <Button className="mt-4 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoryDynamicPage;
