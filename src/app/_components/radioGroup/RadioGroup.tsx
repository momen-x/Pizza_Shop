import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface  option{
    name: string;
    prise: number;
}
interface RadioGroupDemoProps {
  options: option[];  // Changed from 'group' to 'options' for clarity
  defaultValue?: string;  // Optional default selected value
}



export function RadioGroupDemo({ 
  options, 
  defaultValue, 
}: RadioGroupDemoProps) {
  return (
    <RadioGroup 
      defaultValue={defaultValue} 
      className="space-y-2"  // Added for better spacing
    >
      {options.map((option, index) => {
        // Create a unique ID for each radio button
        const id = `radio-${index}`;
        // Extract value (before space) and label (entire string)
        const value = option.name.split(' ')[0].toLowerCase();
        
        return (
          <div key={id} className="flex items-center gap-3">
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id} className="font-normal cursor-pointer">
              {option.name} {option.prise}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}