"use client";
import React, { FormEvent, useState } from "react";
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
  FaCity,
} from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";

import Link from "../Link/Link";
import { LucideSearchCode } from "lucide-react";
import { LiaCitySolid } from "react-icons/lia";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckRegester } from "@/utils/RegisterOnServer";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeStat = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validationInput = (): boolean => {
    const requiredFields: (keyof typeof userData)[] = [
      "name",
      "email",
      "password",
      "confirmPassword",
    ];

    const missingFields = requiredFields.filter((field) => {
      // if (typeof userData[field] === "string") {
      return !userData[field].trim();
      // }
      // return false;
    });

    if (!acceptedTerms) {
      setError("You must accept our terms and privacy policy");
      return false;
    }

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields`);
      return false;
    }

    if (!validateEmail(userData.email)) {
      setError("enter correct email");
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("the password and confirm password is not match");
      return false;
    }
    if (userData.password.length < 6) {
      setError("the password must be at lest 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!validationInput()) return;

    try {
      setLoading(true);
      const response = await CheckRegester(userData);

      if (response.success) {
        setError("");
        setTimeout(() => router.push("/"), 2000); // Remove the duplicate router.push
      } else {
        setError(response.message);
      }
    } catch {
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const calculateStrength = (password: string) => {
    // Implement your strength calculation
    return Math.min((password.length / 10) * 100, 100);
  };

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
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <FaUser className="mr-2 text-orange-500" />
                  Name
                </Label>
                <Input
                  disabled={loading}
                  id="lastName"
                  type="text"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                  value={userData.name}
                  onChange={(e) => {
                    handleChangeStat(e, "name");
                  }}
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
                disabled={loading}
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.email}
                onChange={(e) => {
                  handleChangeStat(e, "email");
                }}
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
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.phoneNumber}
                onChange={(e) => {
                  handleChangeStat(e, "phoneNumber");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <SiGooglestreetview className="mr-2 text-orange-500" />
                street Address
              </Label>
              <Input
                disabled={loading}
                id="address"
                type="text"
                placeholder="enter your address"
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.streetAddress}
                onChange={(e) => {
                  handleChangeStat(e, "streetAddress");
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="postalCode"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <LucideSearchCode className="mr-2 text-orange-500" />
                Postal Code
              </Label>
              <Input
                disabled={loading}
                id="postalCode"
                type="text"
                placeholder="enter your postalCode"
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.postalCode}
                onChange={(e) => {
                  handleChangeStat(e, "postalCode");
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <LiaCitySolid className="mr-2 text-orange-500" />
                City
              </Label>
              <Input
                disabled={loading}
                id="city"
                type="text"
                placeholder="enter your city"
                required
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.city}
                onChange={(e) => {
                  handleChangeStat(e, "city");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <FaCity className="mr-2 text-orange-500" />
                Country
              </Label>
              <Input
                disabled={loading}
                id="country"
                type="text"
                placeholder="enter your country"
                className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                value={userData.country}
                onChange={(e) => {
                  handleChangeStat(e, "country");
                }}
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
                  disabled={loading}
                  id="password"
                  type="password"
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                  value={userData.password}
                  onChange={(e) => {
                    handleChangeStat(e, "password");
                    setPasswordStrength(calculateStrength(e.target.value));
                  }}
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
                  disabled={loading}
                  id="confirmPassword"
                  type="password"
                  required
                  className="py-4 border-gray-300 dark:border-gray-600 focus-visible:ring-orange-500 pl-10"
                  value={userData.confirmPassword}
                  onChange={(e) => handleChangeStat(e, "confirmPassword")}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                required
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
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/30 transition-all"
              onClick={handleRegister}
            >
              {loading ? "Creating Account..." : "Create Account"}{" "}
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
