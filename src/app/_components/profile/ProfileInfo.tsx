"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { TbProgress } from "react-icons/tb";
import { FaUser, FaSave, FaLock, FaTrash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserData } from "@/utils/Server/updateUserInfo";
import { DeleteAcountDialog } from "@/app/profile/_components/DeleteAcountDialog";
import { UpdatePasswordDialog } from "@/app/profile/_components/UpdatePassword";

interface UserData {
  name: string;
  email: string;
  imgURL: string;
}
interface UpdateUserData {
  name?: string;
  email?: string;
  image?: string; // Changed from imgURL to image
  id: string;
}

interface InfoAccountProps {
  id: string;
  email: string;
  name: string;
  imgURL: string;
  onUpdate?: () => void;
}

const InfoAccount = (props: InfoAccountProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    imgURL: "",
  });
  const [originalData, setOriginalData] = useState<UserData>({
    name: "",
    email: "",
    imgURL: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [, setImageError] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdatePasswordDialog, setOpenUpdatePasswordDialog] =
    useState(false);

  useEffect(() => {
    setOriginalData({
      name: props.name,
      email: props.email,
      imgURL: props.imgURL,
    });
    setUserData({
      name: props.name,
      email: props.email,
      imgURL: props.imgURL,
    });
  }, [props.name, props.email, props.imgURL]);

  const validateForm = (): boolean => {
    if (!userData.email.trim() || !userData.name.trim()) {
      setError("Please fill all fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleUpdateUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Prepare update object with only changed fields
      const updateObject: UpdateUserData = { id: props.id };
      updateObject.id = props.id;
      if (userData.email.trim() && userData.email !== originalData.email) {
        updateObject.email = userData.email;
      }

      if (userData.name.trim() && userData.name !== originalData.name) {
        updateObject.name = userData.name;
      }

      if (userData.imgURL.trim() && userData.imgURL !== originalData.imgURL) {
        updateObject.image = userData.imgURL;
      }

      // Check if there are any changes to update
      if (Object.keys(updateObject).length === 0) {
        setError("No changes detected");
        setLoading(false);
        return;
      }

      // Call the update function
      const res = await updateUserData(updateObject);

      // Handle the response based on your API structure
      if (res.success) {
        setSuccess(true);
        setOriginalData(userData); // Update original data

        // Call the onUpdate callback if provided
        if (props.onUpdate) {
          props.onUpdate();
        }
      } else {
        // Handle error response
        setError(res.message || "Failed to update profile");
      }
    } catch {
      console.error("Update error:");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary/10 cursor-pointer">
            <AvatarImage
              src={userData.imgURL}
              alt="Profile"
              className="cursor-pointer"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {userData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-3xl font-bold mt-4">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and security
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaUser className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaLock className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <AlertDescription>
                    Profile updated successfully!
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleUpdateUserInfo} className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex items-center gap-3">
                    <FaUser className="h-5 w-5 text-muted-foreground" />
                    <div className="grid gap-2 flex-1">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={loading}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdEmail className="h-5 w-5 text-muted-foreground" />
                    <div className="grid gap-2 flex-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        disabled={loading}
                        className="w-full"
                      />
                    </div>
                  </div>

                 
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={
                      (userData.name === originalData.name &&
                        userData.email === originalData.email &&
                        userData.imgURL === originalData.imgURL) ||
                      loading
                    }
                    className="gap-2"
                  >
                    {loading ? (
                      <>
                        <TbProgress className="h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenUpdatePasswordDialog(true);
                  }}
                >
                  <FaLock className="h-4 w-4" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">
                  Delete Account
                </CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  className="gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenDeleteDialog(true);
                  }}
                >
                  <FaTrash className="h-4 w-4 text-red-500 cursor-pointer" />
                  Delete Acount
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <DeleteAcountDialog
        id={props.id}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
      <UpdatePasswordDialog
        id={props.id}
        open={openUpdatePasswordDialog}
        setOpen={setOpenUpdatePasswordDialog}
      />
    </div>
  );
};

export default InfoAccount;
