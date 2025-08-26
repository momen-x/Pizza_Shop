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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAcount } from "@/utils/Server/deleteUserOnServer";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Iprops {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export function DeleteAcountDialog({ id, open, setOpen }: Iprops) {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const res = await deleteAcount(password, id);
    try {
      setLoading(true);
      if (res.success) {
        setError("");
        setOpen(false);
        router.refresh();
      } else {
        setError(res.message);
      }
    } catch {
      setError(res.message || "unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        {error.length > 0 && <Alert>{error}</Alert>}
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete profile</DialogTitle>
            <DialogDescription>
              Are you scre , you want delete this account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                name="password"
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={password.trim().length < 6 || loading}
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
