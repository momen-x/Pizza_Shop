"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
interface CheckboxDemoProps {
  options: Option[];
}

interface Option {
  name: string;
  prise: number;
}
export function CheckboxDemo({ options }: CheckboxDemoProps) {
  return (
    <div className="flex flex-col gap-6">
      {options.map((option, index) => {
        return (
          <div className="flex items-start gap-3" key={index}>
            <Checkbox id={`${index}`} defaultChecked />
            <div className="grid gap-2">
              <Label htmlFor={`${index}`}>
                {option.name} {option.prise}
              </Label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
