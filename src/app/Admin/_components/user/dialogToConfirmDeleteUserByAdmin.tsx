"use client";
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
import { deleteUserByAdmin } from "@/utils/Server/DeleteUserByAdmin";
import { FormEvent } from "react";

interface Iprops {
  id: string;
  open: boolean;
  setopen: (open: boolean) => void;
}
export function DialogToConfirmDeleteUserByAdmin(props: Iprops) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deleteUserByAdmin(props.id);
      props.setopen(false);
    } catch (error) {
      console.log(error);
    } finally {
      props.setopen(false);
    }
  };
  return (
    <Dialog open={props.open}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Are u shere you want delete this user
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
