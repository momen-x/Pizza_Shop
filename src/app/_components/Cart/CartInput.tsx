"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MapPin,
  Hash,
  Globe,
  ShoppingBag,
  Trash2,
  CreditCard,
  Truck,
} from "lucide-react";
import { Extra, useCart } from "@/context/CartContext";
import Image from "next/image";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import Link from "../Link/Link";

const CartInput = () => {
  const { cart, deliveryFee, getSubTotal, getTotalAmount, setCart } = useCart();

  const [cartData, setCartData] = useState({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const removeItemFromCart = (id: string, size: string, extras: Extra[]) => {

    const newCart = cart.filter((item) => {
      const isMatch =
        item.id === id &&
        item.size.name === size &&
        JSON.stringify(item.extras) === JSON.stringify(extras);

      return !isMatch;
    });

    setCart(newCart);

    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCartData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    //   setTimeout(() => {
    //     setIsProcessing(false);
    //     // Handle order submission here
    //   }, 2000);
    // };
  };
  const isFormValid = () => {
    return (
      Object.values(cartData).every((value) => value.trim() !== "") &&
      cart.length > 0
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Add some delicious items to your cart to get started!
              </p>
              <Link href={"/menu"}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Browse Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your items and provide delivery details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShoppingBag className="h-5 w-5 text-orange-500" />
                  Your Order ({cart.length}{" "}
                  {cart.length === 1 ? "item" : "items"})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size.name}-${index}`}
                      className="p-6"
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-orange-100 dark:ring-gray-700">
                            <Image
                              src={extractDirectImageUrl(item.image)}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                            {item.name}
                          </h3>

                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                            >
                              Size: {item.size.name}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-gray-300 dark:border-gray-600"
                            >
                              Qty: {item.quantity}
                            </Badge>
                          </div>

                          {/* Extras */}
                          {item.extras && item.extras.length > 0 && (
                            <div className="mb-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                Extras:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.extras.map((extra, extraIndex) => (
                                  <span
                                    key={extraIndex}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                  >
                                    {extra.name} (+${extra.price})
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Price Calculation */}
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div>
                              Base: ${item.basePrice} + Size: ${item.size.price}
                            </div>
                            {item.extras && item.extras.length > 0 && (
                              <div>
                                Extras: $
                                {item.extras.reduce(
                                  (sum, extra) => sum + extra.price,
                                  0
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              $
                              {(
                                (item.basePrice +
                                  item.size.price +
                                  (item.extras?.reduce(
                                    (sum, extra) => sum + extra.price,
                                    0
                                  ) || 0)) *
                                item.quantity
                              ).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              $
                              {(
                                item.basePrice +
                                item.size.price +
                                (item.extras?.reduce(
                                  (sum, extra) => sum + extra.price,
                                  0
                                ) || 0)
                              ).toFixed(2)}{" "}
                              each
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeItemFromCart(
                                item.id,
                                item.size.name,
                                item.extras
                              )
                            }
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>${getSubTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Fee
                  </span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${getTotalAmount().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form - Right Side (1/3 width) */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm sticky top-8">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                      <Input
                        value={cartData.phone}
                        id="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        required
                        className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg transition-colors"
                        onChange={(e) => handleInputChange(e, "phone")}
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="streetAddress"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Street Address *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                      <Input
                        value={cartData.streetAddress}
                        id="streetAddress"
                        type="text"
                        placeholder="123 Main Street"
                        required
                        className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg transition-colors"
                        onChange={(e) => handleInputChange(e, "streetAddress")}
                      />
                    </div>
                  </div>

                  {/* Postal Code & City */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="postalCode"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Postal Code *
                      </Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                        <Input
                          value={cartData.postalCode}
                          id="postalCode"
                          type="text"
                          placeholder="12345"
                          required
                          className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg transition-colors"
                          onChange={(e) => handleInputChange(e, "postalCode")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        City *
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                        <Input
                          id="city"
                          type="text"
                          placeholder="New York"
                          required
                          className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg transition-colors"
                          value={cartData.city}
                          onChange={(e) => handleInputChange(e, "city")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Country *
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                      <Input
                        id="country"
                        type="text"
                        placeholder="United States"
                        required
                        className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 rounded-lg transition-colors"
                        value={cartData.country}
                        onChange={(e) => handleInputChange(e, "country")}
                      />
                    </div>
                  </div>

                  {/* Order Total Display */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg mt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        ${getTotalAmount().toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg mt-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
                    disabled={!isFormValid() || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    By placing this order, you agree to our terms and conditions
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInput;
