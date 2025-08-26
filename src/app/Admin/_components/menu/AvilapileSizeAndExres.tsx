"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExtraIngredients, ProductSizes } from "@prisma/client";

const sizes = [
  {
    name: "Small",
    value: ProductSizes.SMALL,
  },
  {
    name: "Medium",
    value: ProductSizes.MEDIUM,
  },
  {
    name: "Large",
    value: ProductSizes.LARGE,
  },
];

const extras = [
  { name: "Bacon", value: ExtraIngredients.BACON },
  { name: "Cheese", value: ExtraIngredients.CHEESE },
  { name: "Onion", value: ExtraIngredients.ONION },
  { name: "Pepper", value: ExtraIngredients.PEPPER },
  { name: "Tomato", value: ExtraIngredients.TOMATO },
];

interface Props {
  selectedSizes: { size: ProductSizes; price: number }[];
  selectedExtras: { extra: ExtraIngredients; price: number }[];
  onSizeChange: (size: ProductSizes, isSelected: boolean, price: number) => void;
  onExtraChange: (extra: ExtraIngredients, isSelected: boolean, price: number) => void;
}

export function AvilapileSizeAndExres({
  selectedSizes,
  selectedExtras,
  onSizeChange,
  onExtraChange,
}: Props) {
  
  const isSizeSelected = (size: ProductSizes) => {
    return selectedSizes.some(s => s.size === size);
  };

  const isExtraSelected = (extra: ExtraIngredients) => {
    return selectedExtras.some(e => e.extra === extra);
  };

  const getSizePrice = (size: ProductSizes) => {
    const selectedSize = selectedSizes.find(s => s.size === size);
    return selectedSize ? selectedSize.price : 0;
  };

  const getExtraPrice = (extra: ExtraIngredients) => {
    const selectedExtra = selectedExtras.find(e => e.extra === extra);
    return selectedExtra ? selectedExtra.price : 0;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sizes Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Sizes *</h3>
        <div className="grid gap-4">
          {sizes.map((size) => {
            const isSelected = isSizeSelected(size.value);
            return (
              <div key={size.name} className="flex items-center gap-4 p-3 border rounded-lg">
                <Checkbox
                  id={`size-${size.value}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const price = checked ? getSizePrice(size.value) : 0;
                    onSizeChange(size.value, checked as boolean, price);
                  }}
                />
                <div className="flex-1">
                  <Label htmlFor={`size-${size.value}`} className="text-sm font-medium">
                    {size.name}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`size-price-${size.value}`} className="text-sm">
                    Extra Price ($):
                  </Label>
                  <Input
                    id={`size-price-${size.value}`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-24"
                    value={getSizePrice(size.value)}
                    disabled={!isSelected}
                    onChange={(e) => {
                      const price = parseFloat(e.target.value) || 0;
                      onSizeChange(size.value, isSelected, price);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500">
          Select at least one size. Extra price is added to the base price.
        </p>
      </div>

      {/* Extras Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Extras (Optional)</h3>
        <div className="grid gap-4">
          {extras.map((extra) => {
            const isSelected = isExtraSelected(extra.value);
            return (
              <div key={extra.name} className="flex items-center gap-4 p-3 border rounded-lg">
                <Checkbox
                  id={`extra-${extra.value}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const price = checked ? getExtraPrice(extra.value) : 0;
                    onExtraChange(extra.value, checked as boolean, price);
                  }}
                />
                <div className="flex-1">
                  <Label htmlFor={`extra-${extra.value}`} className="text-sm font-medium">
                    {extra.name}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`extra-price-${extra.value}`} className="text-sm">
                    Price ($):
                  </Label>
                  <Input
                    id={`extra-price-${extra.value}`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-24"
                    value={getExtraPrice(extra.value)}
                    disabled={!isSelected}
                    onChange={(e) => {
                      const price = parseFloat(e.target.value) || 0;
                      onExtraChange(extra.value, isSelected, price);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500">
          Optional extras that customers can add to their order.
        </p>
      </div>
    </div>
  );
}