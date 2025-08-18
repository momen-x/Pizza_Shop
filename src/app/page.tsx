import Image from "next/image";
import pizza from "../../public/assets/images/pizzaHome.jpeg";
import { Button } from "@/components/ui/button";
import { LiaSignInAltSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";
import About from "./_components/Apout/about";
import Contact from "./_components/Contact/Contact";
import { prisma } from "@/lib/prisma";
import MenuPart from "./_components/MenuPart/MenuPart";
import { ProductType } from "@/utils/productsType";

async function Home() {
  try {
    // Check if prisma is available
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return <div>Database connection error</div>;
    }

    const rawProducts: ProductType[] = await prisma.product.findMany({
      orderBy: {
        order: "desc",
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    // console.log("prouct us", await rawProducts);

    const Products: ProductType[] = rawProducts.map((product) => ({
      basePrice: product.basePrice,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      description: product.description,
      id: product.id,
      image: product.image,
      name: product.name,
      order: product.order,
      updatedAt: product.updatedAt,
      sizes: product.sizes.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      })),
      extras: product.extras ? product.extras.map((e) => ({
        id: e.id,
        name: e.name,
        price: e.price,
      })) : [],
    }));

    const data = [];
    if (!Products || Products.length === 0) {
      return (
        <main className="bg-white dark:bg-gray-900">
          {/* Your existing JSX but with empty data */}
          <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8">
            {/* Hero section remains the same */}
            <div className="md:w-1/2 space-y-6">
              <h3 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Slice into <span className="text-orange-500">Happiness</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Craving pizza? We&apos;ve got you covered with fresh
                ingredients, endless flavors, and the fastest delivery. Your
                perfect slice is just a tap away!
              </p>
              {/* ... rest of hero section */}
            </div>
            {/* ... rest of your JSX */}
          </section>
          <MenuPart data={[]} title="Best Sellers" description="CHECK OUT" />
          <About />
          <Contact />
        </main>
      );
    }

    // for (let i = 0; i < Products.length && i < 3; i++) {
    //   data.push(Products[i]);
    // }

    for (let i = 0; i < Products.length && i < 3; i++) {
      data.push(Products[i]);
      // console.log(`Product ${i + 1}:`, Products[i]);
    }

    return (
      <main className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Slice into <span className="text-orange-500">Happiness</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Craving pizza? We&apos;ve got you covered with fresh ingredients,
              endless flavors, and the fastest delivery. Your perfect slice is
              just a tap away!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full bg-orange-500 text-white hover:bg-orange-600 px-6 py-6 text-lg">
                Order now <LiaSignInAltSolid className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-6 text-lg"
              >
                Learn more <IoIosArrowForward className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              alt="Delicious Pizza"
              src={pizza}
              width={600}
              height={600}
              className="rounded-2xl shadow-2xl object-cover"
              priority
              loading="eager"
            />
          </div>
        </section>

        {/* Best Sellers Section */}
        <MenuPart data={data} title="Best Sellers" description="CHECK OUT" />
        {/* About Us Section */}
        <About />

        {/* CTA Section */}
        <Contact />
      </main>
    );
  } catch (error) {
    console.error("Database error:", error);
    return (
      <main className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <p>Unable to load products. Please try again later.</p>
        </div>
      </main>
    );
  }
}
export default Home;
