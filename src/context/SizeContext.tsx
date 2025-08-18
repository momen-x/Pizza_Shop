"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductType } from "@/utils/productsType";
import { createContext, useContext, useState } from "react";

export interface SizeContextType {
  size: string;
  prise: number;
  setPrise: (prise: number) => void;
  setSize: (size: string) => void;
  product: ProductType | null;
  setProduct: (product: ProductType | null) => void;
}

const sizeContext = createContext<SizeContextType | undefined>(undefined);

export default function SizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState<string>("small");
  const [prise, setPrise] = useState<number>(0);
  const [product, setProduct] = useState<ProductType | null>(null);

  return (
    <sizeContext.Provider value={{ size, setSize, prise, setPrise, product,setProduct }}>
      {children}

      <RadioGroup
        defaultValue={size}
        className="space-y-2" // Added for better spacing
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem value={size} id={size} />
          <Label htmlFor={size} className="font-normal cursor-pointer">
            {size} {prise}
          </Label>
        </div>
      </RadioGroup>
    </sizeContext.Provider>
  );
}

export function useSizeContext() {
  const context = useContext(sizeContext);
  if (!context) {
    throw new Error("useSizeContext must be used within a SizeProvider");
  }
  return context;
}
