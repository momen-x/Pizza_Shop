"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Hash, Globe, User, Shield, Save } from "lucide-react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { SiNamemc } from "react-icons/si";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { showAdminData } from "@/utils/Server/ShowAdminInfo";
import { updateAdminInformation } from "@/utils/Server/editAdminInfo";
import { Alert } from "@/components/ui/alert";
import { logoutAndRedirect } from "@/utils/Server/logoutOnServeer";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
}

const ProfileInput = (props: IProps) => {
  // const [isAdmin, setAdmin] = useState(true);
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    streetAddress: "123 Business Avenue",
    postalCode: "10001",
    city: "New York",
    country: "United States",
    isAdmin: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await showAdminData(props.id);
        // console.log("input data from barakjf >>>>> : ", data);
        setProfileData({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          streetAddress: data.streetAddress || "",
          postalCode: data.postalCode || "",
          city: data.city || "",
          country: data.country || "",
          isAdmin: data.isAdmin,
        });
      } catch {
        setProfileData({
          name: "",
          email: "",
          phone: "",
          streetAddress: "",
          postalCode: "",
          city: "",
          country: "",
          isAdmin: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [props.id]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const isFormValid = (): boolean => {
    return (
      (profileData.name.length > 0 && profileData.email.length > 0) ||
      !profileData.isAdmin
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await updateAdminInformation(profileData, props.id);

      if (res.success) {
        if (!profileData.isAdmin) {
          logoutAndRedirect();
          router.refresh();
        }
        setError("");

        // Optional: refetch data to ensure consistency
        // await fetchData();
      } else {
        console.log(">>>>>>>>>>>>>>> error");

        setError(res.message);
      }
    } catch {
      setError("Failed to update profile");
    } finally {
      setIsProcessing(false);
    }
  };



  return (
    <div className="min-h-screen mx-18 mb-20 lg:w-full sm:w-xs  md:w-lg bg-gradient-to-br  p-4 md:p-6">
      <div className="max-w-4xl ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold ">Admin Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account information and settings
            </p>
          </div>
          <Badge
            variant="outline"
            className="mt-2 sm:mt-0 bg-blue-50 text-blue-700 border-blue-200"
          >
            <Shield className="w-4 h-4 mr-1" />
            Administrator Account
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                {/* <div className="flex flex-col items-center md:w-1/4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                      {getInitials(profileData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="w-full">
                    Change Avatar
                  </Button>
                </div> */}

                {/* Form Section */}
                <div className="flex-1">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error.length > 0 && <Alert>{error}</Alert>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <div className="relative">
                          <SiNamemc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            value={profileData.name}
                            id="name"
                            type="text"
                            className="pl-10 h-11"
                            onChange={(e) => handleInputChange(e, "name")}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative">
                          <MdOutlineAlternateEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            value={profileData.email}
                            id="email"
                            type="email"
                            className="pl-10 h-11"
                            onChange={(e) => handleInputChange(e, "email")}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                          <Input
                            value={profileData.phone}
                            id="phone"
                            type="tel"
                            className="pl-10 h-11"
                            onChange={(e) => handleInputChange(e, "phone")}
                          />
                        </div>
                      </div>

                      {/* Admin Status */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="isAdmin"
                          className="text-sm font-medium"
                        >
                          Account Type
                        </Label>
                        <div className="flex items-center space-x-2 rounded-md border p-3 h-11">
                          <GrUserAdmin className="text-gray-500 w-4 h-4" />
                          <Label htmlFor="isAdmin" className="flex-1 ml-2">
                            Administrator Account
                          </Label>
                          <Checkbox
                            id="isAdmin"
                            checked={profileData.isAdmin}
                            onCheckedChange={() => {
                              setProfileData({
                                ...profileData,
                                isAdmin: !profileData.isAdmin,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Street Address */}
                        <div className="space-y-2 md:col-span-2">
                          <Label
                            htmlFor="streetAddress"
                            className="text-sm font-medium"
                          >
                            Street Address
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                              value={profileData.streetAddress}
                              id="streetAddress"
                              type="text"
                              className="pl-10 h-11"
                              onChange={(e) =>
                                handleInputChange(e, "streetAddress")
                              }
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium">
                            City
                          </Label>
                          <Input
                            id="city"
                            type="text"
                            className="h-11"
                            value={profileData.city}
                            onChange={(e) => handleInputChange(e, "city")}
                          />
                        </div>

                        {/* Postal Code */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="postalCode"
                            className="text-sm font-medium"
                          >
                            Postal Code
                          </Label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                              value={profileData.postalCode}
                              id="postalCode"
                              type="text"
                              className="pl-10 h-11"
                              onChange={(e) =>
                                handleInputChange(e, "postalCode")
                              }
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="country"
                            className="text-sm font-medium"
                          >
                            Country
                          </Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                              id="country"
                              type="text"
                              className="pl-10 h-11"
                              value={profileData.country}
                              onChange={(e) => handleInputChange(e, "country")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <Button
                        type="submit"
                        className="h-11 px-8 gap-2"
                        disabled={!isFormValid() || isProcessing || loading}
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;
