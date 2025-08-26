"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserPassword } from "@/utils/Server/updateUserInfo";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface IProps {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function UpdatePasswordDialog({ id, open, setOpen }: IProps) {
  const router = useRouter();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const validation = (): boolean => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    let isValid = true;

    if (!password.oldPassword.trim()) {
      newErrors.oldPassword = "Old password is required";
      isValid = false;
    } else if (password.oldPassword.length < 6) {
      newErrors.oldPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!password.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (password.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!password.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      isValid = false;
    } else if (password.confirmNewPassword !== password.newPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserPassword(password, id);

      if (res.success) {
        setError({ newPassword: "", oldPassword: "", confirmNewPassword: "" });
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setOpen(false);
        router.refresh();
      } else {
        setError((prev) => ({
          ...prev,
          oldPassword: res.message || "Update failed",
        }));
      }
    } catch {
      setError((prev) => ({
        ...prev,
        oldPassword: "An unexpected error occurred",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError({ newPassword: "", oldPassword: "", confirmNewPassword: "" });
    setPassword({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Password</DialogTitle>
            <DialogDescription>
              Enter your current password and set a new one
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              {error.oldPassword && (
                <Alert variant="destructive" className="text-red-600">
                  {error.oldPassword}
                </Alert>
              )}
              <Input
                id="oldPassword"
                type="password"
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
                disabled={loading}
                placeholder="Enter current password"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              {error.newPassword && (
                <Alert variant="destructive" className="text-red-600">
                  {error.newPassword}
                </Alert>
              )}
              <Input
                id="newPassword"
                type="password"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
                disabled={loading}
                placeholder="Enter new password"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              {error.confirmNewPassword && (
                <Alert variant="destructive" className="text-red-600">
                  {error.confirmNewPassword}
                </Alert>
              )}
              <Input
                id="confirmPassword"
                type="password"
                value={password.confirmNewPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirmNewPassword: e.target.value,
                  })
                }
                disabled={loading}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
