import Image from "next/image";
import React from "react";
import pizza1 from "../../../public/assets/images/pizza2.jpeg";

const About = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              alt="Pizzeria"
              src={pizza1} 
              width={600}
              height={400}
              loading="eager"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-orange-500 font-semibold">OUR STORY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
              About <span className="text-orange-500">Us</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Welcome to our pizzeria, where we serve the finest pizzas made
              with the freshest ingredients. Every slice is a masterpiece,
              crafted with care to deliver the perfect balance of flavors. From
              classic favorites to unique creations, there&apos;s something for
              every pizza lover!
              <br />
              <br />
              Our passion for pizza shines through every dish. We hand-pick the
              best local ingredients and bake them to perfection, ensuring that
              every bite is delicious and satisfying. Whether you&apos;re here
              for a quick meal or a relaxed dining experience, we&apos;ve got
              you covered.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
