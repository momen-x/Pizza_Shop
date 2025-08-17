"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaGoogle,
  FaPizzaSlice,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
} from "react-icons/fa";
import Link from "../Link/Link";
// import Image from "next/image";
// import pizzaBackground from "../../../../public/assets/images/pizzaHome.jpeg";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Pizza slice decoration */}
      <div className="absolute top-10 right-10 rotate-12 opacity-20 dark:opacity-10">
        <FaPizzaSlice className="text-orange-400 text-9xl" />
      </div>
      <div className="absolute bottom-10 left-10 -rotate-12 opacity-20 dark:opacity-10">
        <FaPizzaSlice className="text-orange-400 text-9xl" />
      </div>

      <Card className="w-full max-w-md z-10 border-none shadow-2xl dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
        {/* Pizza-themed header */}
        <div className="bg-orange-500 px-6 py-4 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Join Our Pizza Family!
          </CardTitle>
          <CardDescription className="text-orange-100">
            Get 15% off your first order when you register
          </CardDescription>
        </div>

        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaUser className="mr-2 text-orange-500" />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaUser className="mr-2 text-orange-500" />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <FaEnvelope className="mr-2 text-orange-500" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <FaPhone className="mr-2 text-orange-500" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (___) ___-____"
                required
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaLock className="mr-2 text-orange-500" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaLock className="mr-2 text-orange-500" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                I agree to the{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              <FaPizzaSlice className="mr-2" />
              Create Account & Get My Discount!
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 p-6 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full py-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href={"/login"}>
              <Button
                variant="link"
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 p-0 h-auto text-sm"
              >
                Sign in here
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
