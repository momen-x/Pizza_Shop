"use client";
import { useEffect, useState } from "react";
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
import { useCart, CartItem } from "@/context/CartContext";

interface DialogDemoProps {
  product: ProductType;
}
//toDo refactor code to display a correct quantity
export function DialogDemo({ product }: DialogDemoProps) {
  const { cart, addToCart } = useCart();

  const sizes: SizeType[] = product.sizes;
  const extras: ExtrasType[] = product.extras ? product.extras : [];

  // State for selected options
  const [selectedSize, setSelectedSize] = useState<string>(
    sizes[0]?.name || ""
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtrasType[]>([]);
  const [quantity, setQuantity] = useState(0);
  console.log("quantity is >>>>>> ", quantity);

  const [isOpen, setIsOpen] = useState(false);

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
    console.log("Size changed to:", sizeName);
    setSelectedSize(sizeName);
  };

  const handleExtraChange = (extraName: string, isChecked: boolean) => {
    console.log("Extra changed:", extraName, isChecked);
    const extra = extras.find((e) => e.name === extraName);
    if (extra) {
      setSelectedExtras((prev) =>
        isChecked ? [...prev, extra] : prev.filter((e) => e.name !== extraName)
      );
    }
  };

  useEffect(() => {
    const qua = cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setQuantity(qua);
  }, []);
  const handleAddToCart = () => {
    const selectedSizeObj = sizes.find((s) => s.name === selectedSize);

    if (!selectedSizeObj) {
      console.error("No size selected");
      return;
    }
    setQuantity((q) => q + 1);
    // Create the cart item
    const cartItem: CartItem = {
      name: product.name,
      id: product.id,
      image: product.image,
      basePrice: selectedSizeObj.price,
      quantity: quantity,
      size: {
        id: selectedSizeObj.id || selectedSize,
        name: selectedSizeObj.name as any,
        price: selectedSizeObj.price,
      },
      extras: selectedExtras.map((extra) => ({
        id: extra.id || extra.name,
        name: extra.name as any,
        price: extra.price,
      })),
    };

    addToCart(cartItem);

    // Reset form and close dialog
    // setQuantity(1);
  };
  const onClose = () => {
    setSelectedExtras([]);
    setSelectedSize(sizes[0]?.name || "");
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          defaultValue={sizes[0]?.name}
        />

        <h2 className="w-full m-auto">Any Extra</h2>
        <CheckboxDemo
          options={extras.map((extraOption) => ({
            name: extraOption.name,
            price: extraOption.price,
          }))}
          onCheckedChange={handleExtraChange}
        />

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          {quantity > 0 ? (
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
                onClick={handleAddToCart}
              >
                +
              </Button>
            </div>
          ) : (
            <Button className="bg-orange-400" onClick={handleAddToCart}>
              Add to Cart (${calculateTotal().toFixed(2)})
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
