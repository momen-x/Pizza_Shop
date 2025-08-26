
import EditProductComponent from "@/app/Admin/_components/products/EditProductComponent";
import { prisma } from "@/lib/prisma";
import { ExtraIngredients, ProductSizes } from "@prisma/client";
import React from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

interface ISize {
  name: ProductSizes;
  price: number;
}
interface IExtra {
  name: ExtraIngredients;
  price: number;
}

export interface IData {
  name: string;
  description: string;
  image: string;
  basePrice: number;
  category: string;
  sizes: ISize[];
  extras?: IExtra[];
}
const EitProductPage = async ({ params }: IProps) => {
  const id = (await params).id;
  const data = await prisma.product.findUnique({
    where: { id },
    select: {
      name: true,
      description: true,
      image: true,
      basePrice: true,
      category: true,
      sizes: true,
      extras: true,
    },
  });
  // console.log(data);

  if (data) {
    return (
      <div>
        <EditProductComponent
          id={id}
          size={data.sizes.map((s) => {
            return { name: s.name, price: s.price };
          })}
          extras={data.extras.map((e) => {
            return { name: e.name, price: e.price };
          })}
          category={data.category.name}
          basePrise={data.basePrice}
          name={data.name}
          description={data.description}
          image={data.image}
        />
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <h1>this Product is not exist</h1>
    </div>
  );
};

export default EitProductPage;
