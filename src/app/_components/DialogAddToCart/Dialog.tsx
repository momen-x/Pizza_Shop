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
import { ExtrasType, ProductType, SizeType } from "@/utils/productsType";
import { extractDirectImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { useCart, CartItem } from "@/context/CartContext";

interface DialogDemoProps {
  product: ProductType;
}

export function DialogDemo({ product }: DialogDemoProps) {
  const { addToCart, removeItemFromCart } = useCart();

  const sizes: SizeType[] = product.sizes;
  const extras: ExtrasType[] = product.extras ? product.extras : [];

  const [selectedSize, setSelectedSize] = useState<string>(
    sizes[0]?.name || ""
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtrasType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const calculateTotal = () => {
    const sizeObj = sizes.find((s) => s.name === selectedSize);
    const sizePrice = sizeObj?.price || 0;
    const extrasPrice = selectedExtras.reduce(
      (sum, extra) => sum + extra.price,
      0
    );
    return (product.basePrice + sizePrice + extrasPrice) * quantity;
  };

  const handleSizeChange = (sizeName: string) => {
    setSelectedSize(sizeName);
  };

  const handleExtraChange = (extraName: string, isChecked: boolean) => {
    const extra = extras.find((e) => e.name === extraName);
    if (extra) {
      setSelectedExtras((prev) =>
        isChecked ? [...prev, extra] : prev.filter((e) => e.name !== extraName)
      );
    }
  };

  const handleAddToCart = () => {
    const selectedSizeObj = sizes.find((s) => s.name === selectedSize);

    if (!selectedSizeObj) {
      console.error("No size selected");
      return;
    }

    const cartItem: CartItem = {
      name: product.name,
      id: product.id,
      image: product.image,
      basePrice: selectedSizeObj.price + product.basePrice,
      quantity: quantity,
      size: {
        id: selectedSizeObj.id || selectedSize,
        name: selectedSizeObj.name,
        price: selectedSizeObj.price,
      },
      extras: selectedExtras.map((extra) => ({
        id: extra.id || extra.name,
        name: extra.name,
        price: extra.price,
      })),
    };

    addToCart(cartItem);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const onClose = () => {
    setSelectedExtras([]);
    setSelectedSize(sizes[0]?.name || "");
    setQuantity(1);
    setIsOpen(false);
  };

  const removeItemFrom_Cart = () => {
    removeItemFromCart(product.id);
    setQuantity(1);
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
          productPrice={product.basePrice}
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Quantity:</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
            >
              +
            </Button>
          </div>

          <div className="text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>
        <div>
          <Button
            className="bg-orange-400 hover:bg-orange-100 hover:text-black rounded-3xl"
            type="button"
            onClick={removeItemFrom_Cart}
          >
            remove this item from catr
          </Button>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button className="bg-orange-400" onClick={handleAddToCart}>
            Add to Cart (${calculateTotal().toFixed(2)})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
