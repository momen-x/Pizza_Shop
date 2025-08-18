"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Phone, MapPin, Hash, Globe } from "lucide-react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";
import { extractDirectImageUrl } from "@/utils/imageUtils";

const CartInput = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  
  console.log("Cart items:", cartItems);

  const [cartData, setCartData] = useState({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const deliveryFee = 5.00;
  const finalTotal = cartTotal + deliveryFee;

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
    console.log("Order submitted with data:", cartData);
    console.log("Cart items:", cartItems);
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ index, quantity: newQuantity }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div>
            <h1 className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-8">
              Cart ({cartItems.length} items)
            </h1>

            {cartItems.length === 0 ? (
              <Card className="mb-6">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item, index) => (
                <Card key={index} className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={extractDirectImageUrl(item.product.image)}
                        width={80}
                        height={80}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Size: {item.selectedSize}
                        </p>
                        {item.selectedExtras.length > 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Extras: {item.selectedExtras.join(", ")}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Subtotal
                    </span>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Delivery
                    </span>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-lg dark:text-white">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Section */}
          <div>
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Checkout
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        value={cartData.phone}
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone"
                        required
                        className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white bg-white dark:bg-gray-800"
                        onChange={(e) => handleInputChange(e, "phone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="streetAddress"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Street address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        value={cartData.streetAddress}
                        id="streetAddress"
                        type="text"
                        placeholder="Enter your address"
                        required
                        className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white bg-white dark:bg-gray-800"
                        onChange={(e) => handleInputChange(e, "streetAddress")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="postalCode"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        Postal code
                      </Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <Input
                          value={cartData.postalCode}
                          id="postalCode"
                          type="text"
                          placeholder="Enter postal code"
                          required
                          className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white bg-white dark:bg-gray-800"
                          onChange={(e) => handleInputChange(e, "postalCode")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-gray-700 dark:text-gray-300 font-medium"
                      >
                        City
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <Input
                          id="city"
                          type="text"
                          placeholder="Enter your City"
                          required
                          className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white bg-white dark:bg-gray-800"
                          value={cartData.city}
                          onChange={(e) => handleInputChange(e, "city")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Country
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        id="country"
                        type="text"
                        placeholder="Enter your country"
                        required
                        className="pl-10 h-12 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-black dark:text-white bg-white dark:bg-gray-800"
                        value={cartData.country}
                        onChange={(e) => handleInputChange(e, "country")}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold text-lg mt-6"
                    disabled={cartItems.length === 0}
                  >
                    Pay ${finalTotal.toFixed(2)}
                  </Button>
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