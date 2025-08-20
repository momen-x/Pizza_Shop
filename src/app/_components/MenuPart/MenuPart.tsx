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
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-500 font-semibold">{description}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Our <span className="text-orange-500">{title}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((pizza, index) => (
              <div
                key={pizza.id || index} // Use product id if available, fallback to index
                className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  alt={pizza.name}
                  src={extractDirectImageUrl(pizza.image)}
                  width={400}
                  height={300}
                  loading="eager"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 bg-white dark:bg-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {pizza.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {pizza.description}
                  </p>
                  <p className="text-orange-500 font-bold mt-2">
                    ${pizza.basePrice.toFixed(2)}
                  </p>
                </div>
                <div className="w-full m-auto rounded-2xl bg-orange-400 hover:bg-orange-100 hover:text-black p-2 mb-3.5">
                  <DialogDemo product={pizza} />
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