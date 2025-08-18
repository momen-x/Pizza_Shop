"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Option } from "@/utils/productsType";

interface CheckboxDemoProps {
  options: Option[];
  onCheckedChange?: (name: string, isChecked: boolean) => void;
}

export function CheckboxDemo({ options, onCheckedChange }: CheckboxDemoProps) {
  return (
    <div className="flex flex-col gap-6">
      {options.map((option, index) => {
        return (
          <div className="flex items-start gap-3" key={index}>
            <Checkbox
              id={`${index}`}
              onCheckedChange={(checked) =>
                onCheckedChange?.(option.name, checked as boolean)
              }
            />
            <div className="grid gap-2">
              <Label htmlFor={`${index}`}>
                {option.name} - ${option.price.toFixed(2)}
              </Label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
