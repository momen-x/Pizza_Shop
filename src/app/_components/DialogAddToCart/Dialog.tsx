import pizza from "../../../../public/assets/images/pizzaHome.jpeg";
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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { RadioGroupDemo } from "../radioGroup/RadioGroup";
import { CheckboxDemo } from "../checkBox/CheckBox";
import Image from "next/image";

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-none w-full  my-2 bg-orange-400"
          >
            Add to card
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <Image src={pizza} alt="pizza" style={{ display: "block" }} />
            </div>
            <DialogTitle> Margherita Pizza</DialogTitle>
            <DialogDescription>
              Classic Margherita pizza with tomato, mozzarella.
            </DialogDescription>
          </DialogHeader>
          <h2 className="w-fll m-auto">Pick your size</h2>

          <RadioGroupDemo
            options={[
              { name: "SMALL", prise: 5.99 },
              { name: "MEDIUM", prise: 7.99 },
              {
                name: "LARGE",
                prise: 9.99,
              },
            ]}
            defaultValue="medium"
          />

          <h2 className="w-fll m-auto">Any Extera</h2>
          <CheckboxDemo
            options={[
              {
                name: "Extra Cheese",
                prise: 2.99,
              },
              {
                name: "Extra Sauce",
                prise: 1.99,
              },
              {
                name: "Extra Toppings",
                prise: 3.99,
              },
            ]}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
