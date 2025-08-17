"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  //   ShoppingCart,
  Trash2,
  Phone,
  MapPin,
  Hash,
  Globe,
} from "lucide-react";
import Image from "next/image";
import pizza from "../../../../public/assets/images/pizza2.jpeg";
const CartInput = () => {
  const [cartData, setCartData] = useState({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCartData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted with data:", cartData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div>
            <h1 className="text-3xl font-bold text-orange-500 mb-8">Cart</h1>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={pizza}
                    width={80}
                    height={80}
                    alt="Margherita Pizza"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Margherita Pizza
                    </h3>
                    <p className="text-sm text-gray-500">Size: SMALL × 1</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">$10.99</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-600">$10.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-gray-600">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold text-gray-600">$15.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-lg">$15.99</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Section */}
          <div>
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-xl  font-bold text-gray-900 bg-white">
                  Checkout
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 font-medium"
                    >
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={cartData.phone}
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone"
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => handleInputChange(e, "phone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="streetAddress"
                      className="text-gray-700 font-medium"
                    >
                      Street address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={cartData.streetAddress}
                        id="streetAddress"
                        type="text"
                        placeholder="Enter your address"
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => handleInputChange(e, "streetAddress")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="postalCode"
                        className="text-gray-700 font-medium"
                      >
                        Postal code
                      </Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={cartData.postalCode}
                          id="postalCode"
                          type="text"
                          placeholder="Enter postal code"
                          required
                          className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          onChange={(e) => handleInputChange(e, "postalCode")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-gray-700 font-medium"
                      >
                        City
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="city"
                          type="text"
                          placeholder="Enter your City"
                          required
                          className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          value={cartData.city}
                          onChange={(e) => handleInputChange(e, "city")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-gray-700 font-medium"
                    >
                      Country
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="country"
                        type="text"
                        placeholder="Enter your country"
                        required
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={cartData.country}
                        onChange={(e) => handleInputChange(e, "country")}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg mt-6"
                  >
                    Pay $15.99
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInput;
