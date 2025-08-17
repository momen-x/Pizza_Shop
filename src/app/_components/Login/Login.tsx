import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaPizzaSlice } from "react-icons/fa";
import Image from "next/image";
import pizzaBackground from "../../../../public/assets/images/pizzaHome.jpeg";
import Link from "../Link/Link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background pizza image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={pizzaBackground}
          alt="Pizza background"
          fill
          className="object-cover opacity-20 dark:opacity-10"
          priority
        />
      </div>

      <Card className="w-full max-w-md z-10 border-none shadow-xl dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FaPizzaSlice className="text-orange-500 text-4xl" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back to <span className="text-orange-500">Pizza Shop</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Sign in to slice into exclusive deals and track your orders
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="py-5 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Button
                  variant="link"
                  className="ml-auto text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="py-5 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Let&apos;s Eat! Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full py-5 border-gray-300 dark:border-gray-600"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
           <Link href={"/register"} >
            <Button
              variant="link"
              className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 p-0 h-auto"
              >
              Create one now
            </Button>
                </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;