import Link from "@/app/_components/Link/Link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import React from "react";
import DeleteProductsButton from "../../_components/products/DeleteProductsButton";
import {
  Package,
  Tag,
  Info,
  DollarSign,
  Ruler,
  PlusCircle,
  ArrowLeft,
  Edit3,
} from "lucide-react";
import Image from "next/image";
import { extractDirectImageUrl } from "@/utils/imageUtils";

interface IProps {
  params: Promise<{ id: string }>;
}

const ProductsInfoPage = async ({ params }: IProps) => {
  const id = (await params).id;

  const productInfo = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: true,
      extras: true,
      category: true,
    },
  });

  if (!productInfo) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link href="/Admin/products">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Link href="/Admin/products">
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Product Information
            </h1>
            <p className="">Detailed view of {productInfo.name}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/Admin/products/edit/${productInfo.id}`}>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Edit3 className="w-4 h-4" />
              Edit Product
            </Button>
          </Link>
          <DeleteProductsButton id={productInfo.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Product Card */}
        <div className="lg:col-span-2">
          <div className=" rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b ">
              <h2 className="text-xl font-semibold  flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Product Details
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 ">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Name</span>
                  </div>
                  <p className=" font-medium text-lg">{productInfo.name}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 ">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Base Price</span>
                  </div>
                  <p className=" font-medium text-lg">
                    ${productInfo.basePrice.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 ">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">Category</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {productInfo.category.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 ">
                    <span className="text-sm font-medium">Product ID</span>
                  </div>
                  <p className="text-gray-500 text-sm font-mono">
                    {productInfo.id}
                  </p>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">Description</span>
                  </div>
                  <p className="text-gray-700">{productInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Sizes Card */}
          <div className=" rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b ">
              <h3 className="text-lg font-semibold  flex items-center gap-2">
                <Ruler className="w-5 h-5 text-green-600" />
                Available Sizes
                <span className="ml-auto  text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {productInfo.sizes.length}
                </span>
              </h3>
            </div>

            <div className="p-5">
              {productInfo.sizes.length > 0 ? (
                <ul className="space-y-3">
                  {productInfo.sizes.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center p-3  rounded-lg"
                    >
                      <span className="font-medium ">{s.name}</span>
                      <span className="text-green-700 font-semibold">
                        ${s.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <p>No sizes available</p>
                </div>
              )}
            </div>
          </div>

          {/* Extras Card */}
          <div className=" rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b ">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-purple-600" />
                Available Extras
                <span className="ml-aut text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {productInfo.extras.length}
                </span>
              </h3>
            </div>

            <div className="p-5">
              {productInfo.extras.length > 0 ? (
                <ul className="space-y-3">
                  {productInfo.extras.map((e) => (
                    <li
                      key={e.id}
                      className="flex justify-between items-center p-3 rounded-lg"
                    >
                      <span className="font-medium ">{e.name}</span>
                      <span className="text-green-700 font-semibold">
                        ${e.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 ">
                  <p>No extras available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview (if available) */}
      {productInfo.image && (
        <div className="mt-6 rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-">
            <h3 className="text-lg font-semibold">Product Image</h3>
          </div>
          <div className="p-6 flex justify-center">
            <div className="w-64 h-64 border rounded-lg overflow-hidden">
              <Image
                src={extractDirectImageUrl(productInfo.image)}
                alt={productInfo.name}
                className="w-full h-full object-cover"
                width={300}
                height={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsInfoPage;
