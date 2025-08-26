"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { deleteUserByAdmin } from "@/utils/Server/DeleteUserByAdmin";
import { UpdateUserByAdmin } from "@/utils/Server/UpdateUserByAdmin";
import { DeleteAcountDialog } from "@/app/profile/_components/DeleteAcountDialog";
import Link from "@/app/_components/Link/Link";
import { IoArrowBack } from "react-icons/io5";

interface IProps {
  id: string;
  city: string;
  country: string;
  email: string;
  image: string;
  name: string;
  phone: string;
  postalCode: string;
  role: string;
  streetAddress: string;
  currentUser: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  isAdmin: boolean;
}

const EditUserDataByAdmin = (props: IProps) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    isAdmin: false,
  });
  const [originUserData, setOriginUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserData({
          name: props.name,
          email: props.email,
          phone: props.phone,
          streetAddress: props.streetAddress,
          postalCode: props.postalCode,
          city: props.city,
          country: props.country,
          isAdmin: props.role === "ADMIN",
        });
        setOriginUserData({
          name: props.name,
          email: props.email,
          phone: props.phone,
          streetAddress: props.streetAddress,
          postalCode: props.postalCode,
          city: props.city,
          country: props.country,
          isAdmin: props.role === "ADMIN",
        });
        setLoading(false);
      } catch {
        setMessage({ type: "error", text: "Failed to load user data" });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [props]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      // In a real app, you would call your server action here
      // await UpdateUserByAdmin(userData, id);
      const res = await UpdateUserByAdmin(userData, props.id);
      if (res.success) {
        setMessage({ type: "success", text: res.message });
        // router.push("/Admin/user");
      } else {
        setMessage({ type: "error", text: res.message });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to update user" });
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      if (props.id === props.currentUser) {
        setOpenDialog(true);
      } else {
        if (confirm("are u sure u want delete this user !?")) {
          await deleteUserByAdmin(props.id);
          router.back();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {message && (
            <div
              className={`p-4 rounded-md mb-6 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <Link
            href={"/Admin/user"}
            className="flex w-50 items-center justify-center"
          >
            <IoArrowBack /> Back
          </Link>

          <form onSubmit={handleSubmit} className=" rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-lg font-medium  mb-4 pb-2 border-b">
                  Personal Information
                </h2>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium  mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                  className="w-full px-4 py-2 borde rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) => {
                    setUserData({ ...userData, phone: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={userData.isAdmin}
                  onChange={() => {
                    setUserData({ ...userData, isAdmin: !userData.isAdmin });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isAdmin"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Administrator privileges
                </label>
              </div>

              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">
                  Address Information
                </h2>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={userData.streetAddress}
                  onChange={(e) => {
                    setUserData({ ...userData, streetAddress: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userData.city}
                  onChange={(e) => {
                    setUserData({ ...userData, city: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={userData.postalCode}
                  onChange={(e) => {
                    setUserData({ ...userData, postalCode: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={userData.country}
                  onChange={(e) => {
                    setUserData({ ...userData, country: e.target.value });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                // onClick={() => router.back()}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
          <div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDeleteUser}
            >
              <MdDelete className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      <DeleteAcountDialog
        id={props.id}
        setOpen={setOpenDialog}
        open={openDialog}
      />
    </div>
  );
};

export default EditUserDataByAdmin;
