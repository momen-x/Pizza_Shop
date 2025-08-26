import Link from "@/app/_components/Link/Link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import React from "react";
import {
  FaProductHunt,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaBoxOpen,
} from "react-icons/fa";
import DeleteProductsButton from "../_components/products/DeleteProductsButton";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      sizes: true,
      extras: true,
      image: true,
    },
  });

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <FaProductHunt className="w-6 h-6" />
              </div>
              Products Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all products in the system
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="w-full md:w-64 pl-9"
              />
            </div>
            <Link href={"/Admin/menu-item"}>
              <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white flex items-center gap-2">
                <FaPlus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <Card className=" border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1 ">
                    {products.length}
                  </h3>
                </div>
                <div className="p-3  rounded-full">
                  <FaProductHunt className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=" border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">With Variants</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {
                      products.filter((p) => p.sizes && p.sizes.length > 0)
                        .length
                    }
                  </h3>
                </div>
                <div className="p-3  rounded-full">
                  <FaBoxOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=" border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">With Extras</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {
                      products.filter((p) => p.extras && p.extras.length > 0)
                        .length
                    }
                  </h3>
                </div>
                <div className="p-3  rounded-full">
                  <FaBoxOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className=" border-0 shadow-md rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">No Image</p>
                  <h3 className="text-2xl font-bold mt-1 ">
                    {products.filter((p) => !p.image).length}
                  </h3>
                </div>
                <div className="p-3  rounded-full">
                  <FaBoxOpen className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Products Table */}
        <Card className=" border-0 shadow-md rounded-xl overflow-hidden">
          <CardHeader className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="">
                All Products ({products.length})
              </CardTitle>
              <div className="mt-2 sm:mt-0">
                <Button variant="outline" className="flex items-center gap-2">
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="">
                      <th className="py-4 px-6 text-left font-medium ">
                        Product
                      </th>
                      <th className="py-4 px-6 text-left font-medium ">
                        Description
                      </th>
                      <th className="py-4 px-6 text-left font-medium ">
                        Variants
                      </th>
                      <th className="py-4 px-6 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className=" transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            {product.image ? (
                              <Image
                                src={extractDirectImageUrl(product.image)}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                width={50}
                                height={50}
                              />
                            ) : (
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaProductHunt className="w-6 h-6 text-blue-600" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                ID: {product.id.substring(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="max-w-xs">
                            <p className=" line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes && product.sizes.length > 0 && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {product.sizes.length} sizes
                              </Badge>
                            )}
                            {product.extras && product.extras.length > 0 && (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                {product.extras.length} extras
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-end gap-2">
                            <Link href={`/Admin/products/${product.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <FaEye className="w-3 h-3" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/Admin/products/edit/${product.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <FaEdit className="w-3 h-3" />
                                Edit
                              </Button>
                            </Link>
                            <DeleteProductsButton id={product.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <FaProductHunt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  There are no products in the system yet.
                </p>
                <Link href={"/Admin/menu-item"}>
                  <Button className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white flex items-center gap-2">
                    <FaPlus className="w-4 h-4" />
                    Add Your First Product
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;
