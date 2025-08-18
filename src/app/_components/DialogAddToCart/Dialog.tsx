"use client";
import { useState } from "react";
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
import { RadioGroupDemo } from "../radioGroup/RadioGroup";
import { CheckboxDemo } from "../checkBox/CheckBox";
import { ProductType, SizeType } from "@/utils/productsType";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { ExtrasType } from "../../../utils/productsType";
import { useAppDispatch } from "@/redux/hooks";

interface DialogDemoProps {
  product: ProductType;
}

export function DialogDemo({ product }: DialogDemoProps) {
const dispatch = useAppDispatch();
 
  const sizes: SizeType[] = product.sizes;
  const extras: ExtrasType[] = product.extras ? product.extras : [];

  // State for selected options - initialize with first size
  const [selectedSize, setSelectedSize] = useState<string>(
    sizes[0]?.name || ""
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtrasType[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Calculate total price
  const calculateTotal = () => {
    const sizeObj = sizes.find((s) => s.name === selectedSize);
    const sizePrice = sizeObj?.price || 0;
    const extrasPrice = selectedExtras.reduce(
      (sum, extra) => sum + extra.price,
      0
    );
    return (sizePrice + extrasPrice) * quantity;
  };

  const handleSizeChange = (sizeName: string) => {
    console.log("Size changed to:", sizeName); // Debug log
    setSelectedSize(sizeName);
  };

  const handleExtraChange = (extraName: string, isChecked: boolean) => {
    console.log("Extra changed:", extraName, isChecked); // Debug log
    const extra = extras.find((e) => e.name === extraName);
    if (extra) {
      setSelectedExtras((prev) =>
        isChecked ? [...prev, extra] : prev.filter((e) => e.name !== extraName)
      );
    }
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create cart item
    const cartItem = {
      product,
      selectedSize,
      selectedExtras: selectedExtras.map(extra => extra.name),
      quantity,
      totalPrice: calculateTotal()
    };

    // Dispatch to Redux store
    dispatch(addToCart(cartItem));

    // Reset form
    setSelectedSize(sizes[0]?.name || "");
    setSelectedExtras([]);
    setQuantity(1);

    console.log("Added to cart:", cartItem);
  };
  return (
    <Dialog>
      <form onSubmit={handleAddToCart}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-none w-full my-2 bg-orange-400"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="w-full h-[200px] mx-auto flex justify-center rounded-[20px] overflow-hidden">
              <Image
                src={extractDirectImageUrl(product.image)}
                alt={product.name}
                width={400}
                height={200}
                className="block object-cover w-full h-full"
              />
            </div>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.description}</DialogDescription>
          </DialogHeader>

          <h2 className="w-full m-auto">Pick your size</h2>
          <RadioGroupDemo
            options={sizes.map((sizeOption) => ({
              name: sizeOption.name,
              price: sizeOption.price,
            }))}
            onValueChange={handleSizeChange}
            defaultValue={sizes[0]?.name} // Set first size as default
          />

          <h2 className="w-full m-auto">Any Extra</h2>
          <CheckboxDemo
            options={extras.map((extraOption) => ({
              name: extraOption.name,
              price: extraOption.price,
            }))}
            onCheckedChange={handleExtraChange}
          />

          {/* Debug info - remove this after testing */}
          <div className="text-xs text-gray-500 mt-2">
            <div>Selected Size: {selectedSize}</div>
            <div>
              Selected Extras: {selectedExtras.map((e) => e.name).join(", ")}
            </div>
            <div>
              Size Price: $
              {sizes.find((s) => s.name === selectedSize)?.price || 0}
            </div>
            <div>
              Extras Price: $
              {selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}
            </div>
          </div>

          {/* Total and Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button  className="hover:cursor-pointer hover:bg-red-300 hover:text-red-500"  type="submit"  onClick={handleAddToCart}>
              Add to Cart (${calculateTotal().toFixed(2)})
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
