import { prisma } from "@/lib/prisma";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Plus,
  MoreHorizontal,
  Calendar,
  ListOrdered,
} from "lucide-react";
import Link from "@/app/_components/Link/Link";
import { ICategory } from "@/utils/validation";

const CategoriesPage = async () => {
  const data: ICategory[] = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="min-h-scree p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="mt-2">
              Manage your product categories and organization
            </p>
          </div>
          <Link href={"/Admin/categorie/addCategori"}>
            <Button className="mt-4 md:mt-0 gap-2 bg-orange-400 hover:bg-orange-200 hover:text-black cursor-pointer">
              <Plus className="w-4 h-4" />
              Add New Category
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Categories
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{data.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ListOrdered className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Recently Added
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {data.length > 0
                      ? new Date(data[0].createdAt).toLocaleDateString()
                      : "None"}
                  </h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Highest Order
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {data.length > 0
                      ? Math.max(...data.map((item) => item.order))
                      : 0}
                  </h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <ArrowUpDown className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/Admin/categorie/addCategori/${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <ListOrdered className="w-3 h-3" />
                        Order: {item.order}
                      </Badge>
                      <Badge variant="outline">
                        ID: {item.id.substring(0, 4)}...
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div>
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Link
            href={"/Admin/categorie/addCategori"}
            className="cursor-pointer"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <ListOrdered className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No categories yet
                </h3>
                <p className="text-gray-500">
                  Get started by creating your first category
                </p>
                <Button className="mt-4 gap-2 cursor-pointer">
                  <Plus className="w-4 h-4 cursor-pointer" />
                  Create Category
                </Button>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
