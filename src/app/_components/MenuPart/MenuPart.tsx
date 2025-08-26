import { extractDirectImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import React from "react";
import { DialogDemo } from "../DialogAddToCart/Dialog";
import { ProductType } from "@/utils/productsType";

interface MenuPartProps {
  data: ProductType[];
  title: string;
  description: string;
}

const MenuPart = async ({ data, title, description }: MenuPartProps) => {
  return (
    <div>
      <section className=" py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-semibold">{description}</p>
            <h2 className="text-3xl md:text-4xl font-bold  mt-2">
              Our <span className="text-orange-500">{title}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((pizza, index) => (
              <div
                key={pizza.id || index}
                className="group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-[500px] bg-white dark:bg-gray-700"
              >
                {/* Image Container with Fixed Height */}
                <div className="h-48 overflow-hidden">
                  <Image
                    alt={pizza.name}
                    src={extractDirectImageUrl(pizza.image)}
                    width={400}
                    height={192}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content Container with Fixed Height and Flex Grow */}
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="text-xl font-semibold line-clamp-1">
                    {pizza.name}
                  </h3>
                  <p className=" mt-2 line-clamp-3 flex-grow">
                    {pizza.description}
                  </p>
                  <p className="text-orange-500 font-bold mt-3 text-lg">
                    ${pizza.basePrice.toFixed(2)}
                  </p>
                </div>
                
                {/* Button Container with Fixed Height */}
                <div className="mt-auto p-5 pt-0">
                  <div className="w-full rounded-xl bg-orange-400 hover:bg-orange-500 hover:text-white p-2 transition-colors duration-300">
                    <DialogDemo product={pizza} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPart;