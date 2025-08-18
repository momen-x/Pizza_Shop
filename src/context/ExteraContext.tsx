"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductType } from "@/utils/productsType";
import { createContext, useContext, useState } from "react";

export interface SizeContextType {
  extera: string;
  prise: number;
  setPrise: (prise: number) => void;
  setExtera: (size: string) => void;
  product: ProductType | null;
  setProduct: (product: ProductType | null) => void;
}

const exteraContext = createContext<SizeContextType | undefined>(undefined);

export default function SizeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [extera, setExtera] = useState<string>("small");
  const [prise, setPrise] = useState<number>(0);
  const [product, setProduct] = useState<ProductType | null>(null);

  return (
    <exteraContext.Provider
      value={{ extera, setExtera, prise, setPrise, product, setProduct }}
    >
      {children}

      <div className="flex items-start gap-3">
        <Checkbox id={extera} defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor={extera}></Label>
        </div>
      </div>
    </exteraContext.Provider>
  );
}

export function useExtraContext() {
  const context = useContext(exteraContext);
  if (!context) {
    throw new Error("useSizeContext must be used within a SizeProvider");
  }
  return context;
}
