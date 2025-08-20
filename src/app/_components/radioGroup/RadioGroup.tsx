import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Option } from "@/utils/productsType";

interface RadioGroupDemoProps {
  options: Option[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  productPrice: number;
}

export function RadioGroupDemo({
  options,
  defaultValue,
  onValueChange,
  productPrice,
}: RadioGroupDemoProps) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="space-y-2"
      onValueChange={onValueChange || undefined}
    >
      {options.map((option, index) => {
        const id = `radio-${index}`;
        // Use the original name as the value instead of transforming it
        const value = option.name;

        return (
          <div key={id} className="flex items-center gap-3">
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id} className="font-normal cursor-pointer">
              {option.name} ${(option.price + productPrice).toFixed(2)}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
