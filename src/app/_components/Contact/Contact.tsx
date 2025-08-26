import { Button } from "@/components/ui/button";
import React from "react";

const Contact = () => {
  return (
    <div className="mb-16">
      <section className="bg-orange-500 text-white py-16 h-screen">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold">DON&apos;T HESITATE</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Contact Us Today
          </h2>
          <p className="text-xl mb-8">
            Ready to order or have questions? We&apos;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
              Call Now: +2012121212
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-orange-600 px-8 py-6 text-lg rounded-full"
            >
              Send us a Message
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
