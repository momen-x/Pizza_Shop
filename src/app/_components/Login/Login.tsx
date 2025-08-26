"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdErrorOutline } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaPizzaSlice } from "react-icons/fa";
import Image from "next/image";
import pizzaBackground from "../../../../public/assets/images/pizzaHome.jpeg";
import Link from "../Link/Link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckLogin } from "@/utils/Server/LoginOnServer";

const Login = () => {
  const router = useRouter();
  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    user: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Real-time validation on field change
  useEffect(() => {
    if (touched.email || touched.password) {
      validateForm();
    }
  }, [ touched.email,touched.password]);

  const validateForm = (): boolean => {
    const newError = {
      email: "",
      password: "",
      user: "",
    };
    let isValid = true;

    // Email validation
    if (!checkUser.email.trim()) {
      newError.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkUser.email)) {
      newError.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!checkUser.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    } else if (checkUser.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await CheckLogin(checkUser);

      if (!response.success) {
        setError({ ...error, user: response.message });
      } else {
        router.push("/");
      }
    } catch {
      setError({ ...error, user: "An error occurred during login" });
    } finally {
      setLoading(false);
    }
  };

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
          {error.user && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle className="text-red-600 flex items-center gap-1">
                <MdErrorOutline /> Error
              </AlertTitle>
              <AlertDescription>{error.user}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                disabled={loading}
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className={`py-5 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 ${
                  error.email ? "border-red-500" : ""
                }`}
                value={checkUser.email}
                onChange={(e) => {
                  setCheckUser({ ...checkUser, email: e.target.value });
                }}
                onBlur={() => handleBlur("email")}
              />
              {error.email && (
                <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                  <MdErrorOutline className="inline" />
                  {error.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Password
                </Label>
                <Button
                  variant="link"
                  className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                disabled={loading}
                id="password"
                type="password"
                required
                className={`py-5 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 ${
                  error.password ? "border-red-500" : ""
                }`}
                value={checkUser.password}
                onChange={(e) => {
                  setCheckUser({ ...checkUser, password: e.target.value });
                }}
                onBlur={() => handleBlur("password")}
              />
              {error.password && (
                <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                  <MdErrorOutline className="inline" />
                  {error.password}
                </p>
              )}
            </div>

            <Button
              disabled={loading || !!error.email || !!error.password}
              type="submit"
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Let's Eat! Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          {/* <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div> */}
{/* 
          <Button
            variant="outline"
            className="w-full py-5 border-gray-300 dark:border-gray-600"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Sign in with Google
          </Button> */}

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href={"/register"}>
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
